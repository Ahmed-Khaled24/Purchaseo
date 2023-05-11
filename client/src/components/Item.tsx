import React, { useEffect, useState } from 'react'
import "../css/item.css"
import Stars from './Stars'
import { NavLink, Outlet } from 'react-router-dom'



export default function Item(props: any) {
    let [image, setImage] = useState(props.img);
    function changeImage(e) {
        setImage(e.target.src);
    }


    return (
        <main>
            <div className='item-info'>
                <div className='images'>
                    <div className='main-image-container'>
                        <img src={image} alt={props.alt} className='border-radius main-image' />
                    </div>
                    <div className='other-images'>
                        <img src="/items/item10.jpg" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                        <img src="/items/item11.jpg" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                        <img src="/items/item15.avif" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                        <img src="/items/item1.png" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                        <img src="/items/item2.png" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                        <img src="/items/item3.png" alt={props.alt} className='border-radius other' onClick={changeImage} tabIndex={0} />
                    </div>
                </div>
                <div className='item-text'>
                    <h1>{props.name}</h1>
                    <div className='rate'>
                        <Stars rate={props.rate} />
                        <p>&#8226;</p>
                        <p>{props.reviews} Reviews</p>
                    </div>


                    <div className='desc-title'>Description</div>
                    <p className='desc-text'>{props.desc}</p>
                    <div className='buying'>
                        <button className='purchase-button'><img src="/shopping-bag-white.png" />Add To Cart</button>
                        <div className='price'>{props.price}$</div>
                    </div>
                </div>
            </div>
            <div className='reviews-area' >
                <div>
                    <div className="reviews-selection">
                        <NavLink to="" className='add-review'>Reviews</NavLink>
                        <NavLink to="add-review" className="add-review">Add Review</NavLink>
                    </div>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}