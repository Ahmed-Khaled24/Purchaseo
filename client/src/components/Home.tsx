import React, { useState, useEffect } from "react"
import Box from "./Box"
import { NavLink } from 'react-router-dom';
import "../css/home-products.css"

export default function Home() {
    let category = "electronics";

    return (
        <div className="Home">
            <div className="holder">
                <div>
                    <h1 className="holder--header">Electronics</h1>
                    <img src="/images/Picture7.png" className="elecphoto" />
                    <div className="container">
                        <p className="elecgraph">You can find some of the phones in the market here</p>
                        <NavLink to={`/products/${category}`} >
                            <button className="elecbutton">Check them out </button>
                        </NavLink>

                    </div>
                </div>

            </div>
            <div className="holder">
                <div>

                    <h1 className="holder--header">Home Appliances</h1>
                    <div className="HAdata">
                        <Box
                            name="Mixers"
                            head="Mixers"
                            img="/images/Picture2.png"
                            button="See more"
                            buttonName="b"
                            Nimg="imgHA"
                            category="homeAppliances"
                        />
                        <Box
                            name="Refrigerators"
                            head="Refrigerators"
                            img="/images/Picture3.png"
                            button="See more"
                            buttonName="b"
                            Nimg="imgHA"
                            category="homeAppliances"
                        />
                        <Box
                            name="Ovens"
                            head="Ovens"
                            img="/images/Picture1.png"
                            button="See more"
                            buttonName="b"
                            Nimg="imgHA"
                            category="homeAppliances"
                        />

                    </div>
                </div>
            </div>
            <div className="holder">
                <div>
                    <h1 className="holder--header">Clothes</h1>
                    <div className="HAdata">
                        <Box
                            name="Men"
                            head="Men"
                            img="/images/Picture4.png"
                            buttonName="b"
                            Nimg="imgC"
                            category="men"

                        />
                        <Box
                            name="Women"
                            head="Women"
                            img="/images/Picture5.png"
                            buttonName="b"
                            Nimg="imgC"
                            category="women"

                        />
                        <Box
                            name="Kids"
                            head="Kids"
                            img="/images/Picture6.png"
                            buttonName="b"
                            Nimg="imgC"
                            category="kids"

                        />

                    </div>
                </div>



            </div>
        </div>
    )
}