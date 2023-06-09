import React, { useEffect, useState } from "react";
import { Product } from "../../../server/types/Product";
import "../css/addProduct.css";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const animatedComponents = makeAnimated();
import imageCompression from "browser-image-compression";
import API_URL from "../KEYS";

export default function AddProduct() {
	// TODO: replace added by by user id
	const [formData, setFormData] = useState<Product>({
		product_name: "",
		description: "",
		added_by: 1,
		price: 0,
		inventory: 0,
	});
	const [initialCategories, setInitialCategories] = useState([]);
	const [percentage, setPercentage] = useState<number>(0);
	const [compressedFiles, setCompressedFiles] = useState([]);
	const [categories, setCategories] = useState([]);
	const [currentFiles, setCurrentFiles] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);

	function resetAll() {
		setFormData({
			product_name: "",
			description: "",
			added_by: 1,
			price: 0,
			inventory: 0,
		});
		setCategories([]);
		setCategoryOptions(initialCategories);
		setCurrentFiles([]);
		setPreviewImages([]);
		setCompressedFiles([]);
		setPercentage(0);
	}
	async function getAllCategories() {
		try {
			const response = await axios({
				withCredentials: true,
				method: "GET",
				url: `${API_URL}/categories/all`,
			});
			if (response.status === 200) {
				let categoryOptions = response.data.data.map((category) => {
					return {
						value: category.category_name,
						label: category.category_name,
					};
				});
				setCategoryOptions(categoryOptions);
				setInitialCategories(categoryOptions);
			}
		} catch (error) {
			console.log("error", error.response.data);
		}
	}
	useEffect(() => {
		getAllCategories();
	}, []);
	useEffect(() => {
		handleImageCompression();
	}, [currentFiles]);
	function openFileDialog(event: React.MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		document.getElementById("image-upload").click();
	}
	async function handleImageCompression() {
		let imageFiles = currentFiles;

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
		};
		try {
			let compressedImages: Blob[] = [];
			imageFiles.forEach(async (file) => {
				const example = await imageCompression(file, options);
				compressedImages.push(example);
			});

			setCompressedFiles(compressedImages);
		} catch (error) {
			toast.error(`Could not add product`, {
				position: "bottom-left",
			});
			console.log(error);
		}
	}
	function handleChange(event) {
		const { name, value, type } = event.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}
	function handleSelect(selectedCategories) {
		let formattedCategories = selectedCategories.map((category) => category.value);
		setCategories(formattedCategories);
	}

	const selectFile = (event) => {
		const files = event.target.files;
		const newFiles = [...currentFiles, ...files];
		const newPreviews = [...previewImages];
		for (let i = 0; i < files.length; i++) {
			newPreviews.push(URL.createObjectURL(files[i]));
		}
		setCurrentFiles(newFiles);
		setPreviewImages(newPreviews);
	};

	async function sendInitialProduct() {
		let productData = {
			product: formData,
		};
		if (categories.length > 0) {
			productData["categories"] = categories;
		}
		try {
			const response = await axios({
				withCredentials: true,
				method: "POST",
				url: `${API_URL}/product}`,
				data: productData,
			});
			if (response.status == 201) {
				return response.data.data[0].product_id;
			}
		} catch (error) {
			toast.error(`Could not add product`, {
				position: "bottom-left",
			});
			// TODO: Set Error message in UI
			console.log("error", error.response.data);
		}
	}

	async function getSignedUrls(productId: number) {
		try {
			const signedUrlRes = await axios({
				withCredentials: true,
				method: "GET",
				url: `${API_URL}/image/upload-url?productId=${productId}&length=${currentFiles.length}&fileSize=${currentFiles[0].size}$directoryType=product`,
			});
			if (signedUrlRes.status === 200) {
				return signedUrlRes.data.data;
			}
		} catch (error) {
			toast.error(`Could not add product`, {
				position: "bottom-left",
			});
			console.log("error", error.response.data);
		}
	}
	async function sendImages(signedUrls: string[]) {
		try {
			for (let i = 0; i < signedUrls.length; i++) {
				const response = await axios({
					method: "PUT",
					url: signedUrls[i],
					data: compressedFiles[i],
					headers: {
						"Content-Type": compressedFiles[i].type,
					},
					onUploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setPercentage(percentCompleted);
					},
				});
				if (response.status === 200) {
					setPercentage(0);
					console.log(`success ${i}, ${response.data}`);
				}
			}
		} catch (error) {
			toast.error(`Could not add product`, {
				position: "bottom-left",
			});
			console.log("error", error.response.data);
		}
	}

	async function sendImageUrls(productId: number, signedUrls: string[]) {
		try {
			const response = await axios({
				withCredentials: true,
				method: "POST",
				url: `${API_URL}/image/product/add`,
				data: {
					productId: productId,
					imageUrls: signedUrls,
				},
			});
			if (response.status === 201) {
				// window.location.reload();
			}
		} catch (error) {
			toast.error(`Could not add product`, {
				position: "bottom-left",
			});
			console.log("error", error.response.data);
		}
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (currentFiles.length !== 0) {
			const product_id = await sendInitialProduct();
			const signedUrls = await getSignedUrls(product_id);
			await sendImages(signedUrls);
			//await sendImageUrls(product_id, signedUrls);
			// toast.info("Product Added successfully", {
			//     position: "bottom-left",
			// });
			await toast.promise(
				sendImageUrls(product_id, signedUrls),
				{
					pending: "Adding product",
					success: "Product Added successfully ",
					error: "Could not add product",
				},
				{
					position: "bottom-left",
				}
			);
		} else {
			await toast.promise(
				sendInitialProduct(),
				{
					pending: "Adding product",
					success: "Product Added successfully ",
					error: "Could not add product",
				},
				{
					position: "bottom-left",
				}
			);
		}
		resetAll();
	}
	return (
		<form className="main" onSubmit={handleSubmit}>
			<h1 className="t">Add Product</h1>
			<div>
				<div className="Hold">
					<div className={"product-category-container"}>
						<p className="titleform">Product category</p>
						<div className="form1">
							<div className="category-name-container">
								<span className="name-container">
									<p className="t1">Name</p>
									<input
										type="text"
										onChange={handleChange}
										name="product_name"
										value={formData?.product_name}
									/>
								</span>
								<span className="category-container">
									<p className="t1">Category</p>
									<Select
										closeMenuOnSelect={false}
										components={animatedComponents}
										// defaultValue={[categoryOptions[0]]}
										className={"category-select"}
										isMulti
										onChange={handleSelect}
										options={categoryOptions}
									/>
								</span>
							</div>
							<span>
								<p className="t1">Description</p>
								<textarea
									value={formData.description}
									onChange={handleChange}
									name="description"
									className="textDiscription"
								/>
							</span>
						</div>
					</div>

					<div className={"product-attributes-container"}>
						<p className="titleform">Product attributes</p>
						<div className="form2">
							<span>
								<p className="t1">Price</p>
								<input
									type="text"
									onChange={handleChange}
									name="price"
									value={formData.price}
									className="text2"
								/>
							</span>
							<span>
								<p className="t1">Quantity</p>
								<input
									type="text"
									onChange={handleChange}
									name="inventory"
									value={formData.inventory}
									className="text2"
								/>
							</span>
						</div>
					</div>
				</div>
			</div>

			<section className="Holderimages">
				<div className="Holder">
					<label>
						<input
							id="image-upload"
							type="file"
							accept="image/*"
							className="productImg-input"
							onChange={selectFile}
							multiple
							max="6"
						/>
					</label>
					<div onClick={openFileDialog}>
						{previewImages.length <= 0 && <img src="/Imginsert.png" className="tempImg" />}
						{previewImages.length > 0 && (
							<div>
								<p className="titleform">Selected Files:</p>
								<div className="Images">
									{previewImages.map((preview, index) => (
										<img
											src={preview}
											alt="Preview"
											key={index}
											style={{
												height: "14rem",
												minWidth: "16rem",
												maxWidth: "16rem",
												marginLeft: "2rem",
												objectFit: "fill",
											}}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
			<div className="h">
				<button className="buttonSubmit">Submit</button>
				<div style={{ width: "50px" }}>
					<ToastContainer />
				</div>
			</div>
		</form>
	);
}
