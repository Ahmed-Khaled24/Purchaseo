import React from "react";
import "../css/owner-product.css";

export default function OwnerProduct(props: any) {
  return (
    <div className="product">
      <img src="items/item1.png" alt="Item1" className="product-image" />
      <div className="product-info">
        <h1>Item 1</h1>
        <div className="product-info-review"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      </div>
    </div>
  )
}