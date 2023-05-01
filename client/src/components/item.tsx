import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import "../css/item.css"
import Stars from './Stars'

export default function Body(props: any) {
    let [image, setImage] = useState(props.img);
    function changeImage(e) {
        setImage(e.target.src);
    }
    const reviews = [<ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />];

    return (
        <main>
            <div className='item-info'>
                <div className='images'>
                    <img src={image} alt={props.alt} className='border-radius main-image' />
                    <div className='other-images'>
                        <img src="items/item10.jpg" alt={props.alt} className='border-radius other' onClick={changeImage} />
                        <img src="items/item15.avif" alt={props.alt} className='border-radius other' onClick={changeImage} />
                        <img src="items/item11.jpg" alt={props.alt} className='border-radius other' onClick={changeImage} />
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
                        <button className='purchase-button'><img src="shopping-bag-white.png" />Add To Cart</button>
                        <div className='price'>{props.price}$</div>
                    </div>
                </div>
            </div>

            <h1>Reviews</h1>
            <div className='reviews'>
                {reviews}
            </div>
        </main>
    )
}