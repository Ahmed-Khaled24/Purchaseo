import React, { useState } from "react"
import "../css/AddProduct.css"

export default function AddProduct() {
    const [formData, setFormData] = useState(
        { Name: "",
          Type: "", 
          Discription: "", 
          Price: "", 
          Quantity: "" 
        }
    )
   function fileSelectedHandler(event){
     console.log(event.target.files[0])
   }

    function handleChange(event) {
        const {name, value, type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    function handleSubmit(event) {
        console.log(formData);
         event.preventDefault();
    //    submitToApi(formData);
    }
    return (
        <form className="main"  onSubmit={handleSubmit}>
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


            <section className="Hold">
                <div className="iHolder">
                <img src="/imageInsert.png" className="imgInsert" ></img>
                <input type="file" className="button" onChange={fileSelectedHandler} /> 
                </div>
                <div className="iHolder">
                <img src="/imageInsert.png" className="imgInsert" ></img>
                <input type="file" className="button" onChange={fileSelectedHandler}/> 
                </div>
                <div className="iHolder">
                <img src="/imageInsert.png" className="imgInsert" ></img>
              <input type="file" className="button"  onChange={fileSelectedHandler}/> 
                </div>

            </section>

          
            <div className="h">
            <button className="buttonSubmit">Submit</button>

            </div>
        </form>
    )
}