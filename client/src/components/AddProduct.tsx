import React, { useEffect, useState } from "react";
import { Product } from "../../../server/types/Product";
import "../css/addProduct.css";
import axios from "axios";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

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
        try{
            const response = await axios({
                withCredentials: true,
                method: "POST",
                url :"https://localhost:4000/product/",
                data: {
                    product: formData,
                    categories: categories,
                },
    
            });
            if(response.status == 201){
                console.log("success", response.data)
            }
        }catch(error){
            console.log("error", error.response.data)
        }
    }
    async function sendImages() {}

    async function handleSubmit(event) {
        event.preventDefault();
        // const formData1 = new FormData();
        // formData1.append("Name", formData.Name);
        // formData1.append("Type", formData.Type);
        // formData1.append("Discription", formData.Discription);
        // formData1.append("Price", formData.Price);
        // formData1.append("Quantity", formData.Quantity);
        // for (let i = 0; i < currentFiles.length; i++) {
        //     formData1.append("files", currentFiles[i]);
        // }

        await sendInitialProduct();
        // await sendImages();
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
                                    <p>Name</p>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="product_name"
                                        value={formData?.product_name}
                                        className="text"
                                    />
                                </span>
                                <span>
                                    <p>Category</p>
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={[categoryOptions[0]]}
                                        isMulti
                                        options={categoryOptions}
                                    />
                                </span>
                            </div>
                            <span>
                                <p>Discription</p>
                                <textarea
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    style={{
                                        width: " 30.8rem",
                                        height: "12.25rem",
                                        marginTop: "0.3rem",
                                    }}
                                />
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="titleform">Product attributes</p>
                        <div className="form2">
                            <span>
                                <p>Price</p>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="price"
                                    value={formData.price}
                                    className="text2"
                                />
                            </span>
                            <span>
                                <p>Quantity</p>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="inventory"
                                    value={formData.inventory}
                                    className="text2"
                                />
                            </span>
                            <span>
                                <p>Colors</p>
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
            </div>
        </form>
    );
}
