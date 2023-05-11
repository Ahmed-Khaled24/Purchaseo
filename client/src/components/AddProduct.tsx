import React, { useState } from "react"
import "../css/addProduct.css"

export default function AddProduct() {
    const [formData, setFormData] = useState(
        {
            Name: "",
            Type: "",
            Discription: "",
            Price: "",
            Quantity: ""
        }
    )
    const [currentFiles, setCurrentFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    function handleChange(event) {
        const { name, value, type } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
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

    function handleSubmit(event) {
        console.log(formData);
        event.preventDefault();
        //    submitToApi(formData);
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
                                        name="Name"
                                        value={formData.Name}
                                        className="text"
                                    />
                                </span>
                                <span>
                                    <p >Type</p>
                                    <select
                                        id="Type"
                                        value={formData.Type}
                                        onChange={handleChange}
                                        name="Type"
                                        className="text"
                                    >
                                        <option value=""> </option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                        <option value="Elecronics">Elecronics</option>

                                    </select>
                                </span>

                            </div>
                            <span>
                                <p>Discription</p>
                                <textarea
                                    value={formData.Discription}
                                    onChange={handleChange}
                                    name="Discription"
                                    style={{
                                        width: " 30.8rem",
                                        height: "12.25rem",
                                        marginTop: "0.3rem"
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
                                    name="Price"
                                    value={formData.Price}
                                    className="text2"

                                />
                            </span>
                            <span>
                                <p>Quantity</p>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="Quantity"
                                    value={formData.Quantity}
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
                        <input type="file" accept="image/*" onChange={selectFile} multiple />
                    </label>
                </div>
                <div >

             {previewImages.length <= 0 && (<img src="/Imginsert.png"style={{
                            marginTop:"2rem",
                            width:"62.83rem",
                            height:"23rem",
                            }}/>)}
                {previewImages.length > 0 && (
                    <div>
                        <p className="titleform">Selected Files:</p>
                        <div className="Images" >
                            {previewImages.map((preview, index) => (
                                
                                    <img src={preview} alt="Preview"
                                        key={index}
                                        style={{
                                            height: "14rem",
                                            borderRadius: "9px",
                                            width: "16rem",
                                            marginLeft:"2rem"
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
    )
}