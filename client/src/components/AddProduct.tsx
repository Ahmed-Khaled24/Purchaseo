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

export default function AddProduct() {
    // TODO: replace added by by user id
    const [formData, setFormData] = useState<Product>({
        product_name: "",
        description: "",
        added_by: 1,
        price: 0,
        inventory: 0,
    });
    const [percentage, setPercentage] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([
        { value: "clothes", label: "Clothes" },
        { value: "men", label: "Men" },
        { value: "women", label: "Women" },
        { value: "electronics", label: "Electronics" },
        { value: "homeAppliances", label: "HomeAppliances" },
        { value: "kids", label: "Kids" },
    ]);
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
        let formattedCategories = selectedCategories.map(
            (category) => category.value
        );
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
        console.log({
            product: formData,
            categories: categories,
        });
        try {
            const response = await axios({
                withCredentials: true,
                method: "POST",
                url: "https://localhost:4000/product",
                data: {
                    product: formData,
                    categories: categories,
                },
            });
            if (response.status == 201) {
                return response.data.data[0].product_id;
            }
        } catch (error) {
            // TODO: Set Error message in UI
            console.log("error", error.response.data);
        }
    }

    async function getSignedUrls(productId: number) {
        try {
            const signedUrlRes = await axios({
                withCredentials: true,
                method: "GET",
                url: `https://localhost:4000/image/upload-url?productId=${productId}&length=${currentFiles.length}&fileSize=${currentFiles[0].size}$directoryType=product`,
            });
            if (signedUrlRes.status === 200) {
                return signedUrlRes.data.data;
            }
        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    async function sendImages(signedUrls: string[]) {
        try {
            for (let i = 0; i < signedUrls.length; i++) {
                const response = await axios({
                    method: "PUT",
                    url: signedUrls[i],
                    data: currentFiles[i],
                    headers: {
                        "Content-Type": currentFiles[i].type,
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setPercentage(percentCompleted);

                    },
                });
                if (response.status === 200) {
                    setPercentage(0);
                    console.log(`success ${i}, ${response.data}`);
                }
            }
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    async function sendImageUrls(productId: number, signedUrls: string[]) {
        try {
            const response = await axios({
                withCredentials: true,
                method: "POST",
                url: "https://localhost:4000/image/product/add",
                data: {
                    productId: productId,
                    imageUrls: signedUrls,
                },
            });
            if (response.status === 201) {
                console.log(response.data);
            }
        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    async function handleSubmit(event) {
       
        event.preventDefault();
        toast.info("Data sent successfully", {
            position: "bottom-left",
          });
        const product_id = await sendInitialProduct();
        console.log({ product_id, currentFiles });
        const signedUrls = await getSignedUrls(product_id);
        console.log({ signedUrls });
        await sendImages(signedUrls);
        await sendImageUrls(product_id, signedUrls);

    }
    return (
        <form className="main" onSubmit={handleSubmit}>
            <h1 className="t">Add Product</h1>
            <div>
                <div className="Hold">
                    <div>
                        <p className="titleform">Product category</p>
                        <div className="form1">
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <span>
                                    <p className="t1">Name</p>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="product_name"
                                        value={formData?.product_name}
                                      
                                    />
                                </span>
                                <span>
                                    <p className="t1">Category</p>
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={[categoryOptions[0]]}
                                        isMulti
                                        onChange={handleSelect}
                                        options={categoryOptions}
                                        className="text"
                                    />
                                </span>
                            </div>
                            <span>
                                <p className="t1">Discription</p>
                                <textarea
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    className="textDiscription"
                                />
                            </span>
                        </div>
                    </div>

                    <div>
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
                <div>
                    <label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={selectFile}
                            multiple
                        />
                    </label>
                </div>
                <div>
                    {previewImages.length <= 0 && (
                        <img
                            src="/Imginsert.png"
                            style={{
                                marginTop: "2rem",
                                width: "62.83rem",
                                height: "23rem",
                            }}
                        />
                    )}
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
                                            borderRadius: "9px",
                                            width: "16rem",
                                            marginLeft: "2rem",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
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
