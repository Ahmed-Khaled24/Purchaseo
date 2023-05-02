import React, { useState, useEffect } from "react"
import elect from "../images/Picture7.png"
import p1 from "../images/Picture1.png"
import p2 from "../images/Picture2.png"
import p3 from "../images/Picture3.png"
import p4 from "../images/Picture4.png"
import p5 from "../images/Picture5.png"
import p6 from "../images/Picture6.png"
import Box from "./Box"
import { useNavigate,NavLink } from 'react-router-dom';

export default function Home() {
  let category="electronics";

    return (
        <div>

            <div className="holder">
                <h1 className="holder--header">Electronics</h1>
                <img src={elect} className="elecphoto" />
                <div class="container">
                    <p className="elecgraph">You can find some of the phones in the market here</p>
                    <NavLink to={`/products/${category}`} >
                    <button className="elecbutton">Check them out </button>                 
                    </NavLink>
                 
                </div>
            </div>
            <div className="holder">
                <h1 className="holder--header">Home Appliances</h1>
                <div className="HAdata">
                    <Box
                        name="Mixers"
                        head="Mixers"
                        img={p2}
                        button="See more"
                        buttonName="b"
                        Nimg="imgHA"
                        category="men's clothing"
                    />
                    <Box
                        name="Refrigerators"
                        head="Refrigerators"
                        img={p3}
                        button="See more"
                        buttonName="b"
                        Nimg="imgHA"
                        category="jewelery"  
                    />
                    <Box
                        name="Ovens"
                        head="Ovens"
                        img={p1}
                        button="See more"
                        buttonName="b"
                        Nimg="imgHA"
                        category="jewelery"  
                    />
                </div>
            </div>
            <div className="holder">
                <h1 className="holder--header">Clothes</h1>
                <div className="HAdata">
                    <Box
                        name="Men"
                        head="Men"
                        img={p4}
                        buttonName="b"
                        Nimg="imgC"
                    />
                    <Box
                        name="Women"
                        head="Women"
                        img={p5}
                        buttonName="b"
                        Nimg="imgC"
                    />
                    <Box
                        name="Kids"
                        head="Kids"
                        img={p6}
                        buttonName="b"
                        Nimg="imgC"
                    />

                </div>


            </div>
        </div>
    )
}