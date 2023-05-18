import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../server/types/User";
import { Product } from "../../../server/types/Product";
import { putUser } from "../store/features/userSlice";

import "../css/userpage.css";
import { RootState, AppDispatch } from "../store/store";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const API_URL = "https://localhost:4000";

function PictureSection({ image_url, userName }) {
	let imageFile: File;
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user);

	function openFileDialog() {
		const fileInput = document.getElementById("UploadNewProfilePic");
		fileInput.click();
	}

	function handleChoosePhoto() {
		const fileInput = document.getElementById(
			"UploadNewProfilePic"
		) as HTMLInputElement;
		imageFile = fileInput.files[0];
		const profileImage = document.getElementById(
			"profilePic"
		) as HTMLImageElement;
		profileImage.src = URL.createObjectURL(imageFile);
	}
	async function handleImageCompression(image: File) {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
		};
		try {
			const example = await imageCompression(image, options);
			console.log(example);
			return example;
		} catch (error) {

			console.log(error);
		}
	}
	async function handleUploadPhoto(event) {
		// TODO: Compress the image before uploading
		imageFile = await handleImageCompression(imageFile);
		try {
			const signedUrl = (
				await axios({
					method: "GET",
					url: `${API_URL}/image/upload-url?directoryType=Profile&fileSize=1000&length=1`,
					withCredentials: true,
				})
			).data.data[0];
			const uploadResponse = await axios({
				method: "PUT",
				url: signedUrl,
				data: imageFile,
				headers: {
					"Content-Type": imageFile.type,
				},
			});
			if (uploadResponse.status === 200) {
				toast.success(`Image uploaded successfully`, {
					position: "bottom-left",
				});
				//TODO: notify the user
			}
			const imageUrl = signedUrl.split("?")[0];
			console.log(`image url: ${imageUrl} userId: ${user.user_id}`);
			const response = await axios({
				method: "PATCH",
				withCredentials: true,
				url: `${API_URL}/image/user/add`,
				data: {
					imageUrl: imageUrl,
					id: user.user_id,
				},
			});
			console.log(response.data);
		} catch (error) {
			//TODO: notify the user
			toast.error(`Error uploading image`, {
				position: "bottom-left",
			});
			console.log(error.response.data);
		}
	}

	return (
		<section className="picture-section">
			<img src={image_url || '/images/defaultProfilePic.jpg'} alt="" id="profilePic" />
			<div>
				<label> {userName} </label>
				<input
					type="file"
					accept="image/*"
					id="UploadNewProfilePic"
					onChange={handleChoosePhoto}
				/>
				<button onClick={openFileDialog}> Change picture </button>
				<button onClick={handleUploadPhoto}>Save</button>
			</div>
		</section>
	);
}

function InfoItem({ itemValue, itemName, editable, updateInputValue }) {
	return (
		<div className="info-item">
			<label>{`${itemName}`} </label>
			<input
				name={itemName}
				type="text"
				value={itemValue}
				disabled={!editable}
				onChange={updateInputValue}
			/>
		</div>
	);
}

function InfoSection({ user, editable, updateInputValue }) {
	return (
		<section className="info-section">
			<h1>User information:</h1>
			<div className="info-list">
				<InfoItem
					itemName="email"
					itemValue={user?.email}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<InfoItem
					itemName={"First name"}
					itemValue={`${user?.Fname}`}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<InfoItem
					itemName={"Last name"}
					itemValue={`${user?.Lname}`}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<InfoItem
					itemName={"Phone"}
					itemValue={`${user?.phone_number ? user.phone_number : ""}`}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
			</div>
		</section>
	);
}

function EditSection({ triggerEditable, saveChanges }) {
	return (
		<section className="edit-section">
			<button onClick={saveChanges}>Save</button>
			<button onClick={triggerEditable}>Edit</button>
		</section>
	);
}

function PreviousProduct({ product }) {
	return (
		<div className="previous-product">
			<img src={product.images[0]} />
			<p className="date"> {product.product_name}</p>
		</div>
	);
}

function PreviousBoughtProducts({ userId }: { userId: number }) {
	const [products, setProduct] = useState<Product[]>([]);
	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${API_URL}/product/customer/${userId}`
			);
			setProduct(response.data.data);
		})();
	}, [userId]);
	return (
		<section className="previous-orders-section">
			<h1> Previous orders: </h1>
			<div className="previous-products-list">
				{products.map((product) => (
					<PreviousProduct product={product} />
				))}
			</div>
		</section>
	);
}

function UserPage() {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const [editable, setEditable] = useState<boolean>(false);

	let userBeforeEdit: User;
	function triggerEditable() {
		userBeforeEdit = { ...user };
		setEditable(true);
	}

	async function saveChanges() {
		setEditable(false);
		try {
			const response = await axios({
				method: "PATCH",
				url: `${API_URL}/user/update`,
				withCredentials: true,
				data: {
					id: user.user_id,
					update: {
						Fname: user?.Fname,
						Lname: user?.Lname,
						phone_number: user?.phone_number,
						email: user?.email,
					},
				},
			});
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	}

	function updateInputValue(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = event.target.value;
		let changedInputName = event.target.name;
		if (changedInputName.includes("First")) {
			changedInputName = "Fname";
		} else if (changedInputName.includes("Last")) {
			changedInputName = "Lname";
		} else if (changedInputName.includes("Phone")) {
			changedInputName = "phone_number";
		}
		const newUser: User = { ...user, [changedInputName]: newValue };
		dispatch(putUser(newUser));
	}

	return (
		<div className="profile-container">
			<div className="profile-page">
				<PictureSection
					image_url={user.image_url}
					userName={`${user.Fname} ${user.Lname}`}
				/>
				<InfoSection
					user={user}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<EditSection
					triggerEditable={triggerEditable}
					saveChanges={saveChanges}
				/>
				<PreviousBoughtProducts userId={user.user_id} />
				{/* TODO: add user phone number */}
			</div>
		</div>
	);
}

export default UserPage;
