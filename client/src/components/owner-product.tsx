import React from "react";
import "../css/owner-product.css";
import Stars from "./Stars";

export default function OwnerProduct(props: any) {
  return (
    <div className="product">
      <div className="img-container">
        <img src="items/item15.avif" alt="Item1" className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-info-title_price">
          <h1 className="head">{props.name}</h1>
          <p className="owner-price">60$</p>
        </div>
        <div className="product-info-rate">
          <Stars rate={props.rate} />
          <p >&#8226;</p>
          <p>{props.reviews} Reviews</p>
        </div>
        <p><span className="headline">Description : </span>{props.desc}</p>
        <p><span className="headline">Quantity : </span> 60{props.quantity}</p>
        <p><span className="headline">Sold : </span> 20{props.sold}</p>
        <div className="product-info-buttons">
          <button className="remove-button border-radius">Remove</button>
          <button className="edit-button border-radius">Edit</button>
        </div>
      </div>
    </div>
  )
}