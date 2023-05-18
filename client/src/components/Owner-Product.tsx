import React, { useState } from "react";
import "../css/owner-product.css";
import Stars from "./Stars";
import axios from "axios";
import ModalComponent from "./modal";
import API_URL from "../KEYS";

export default function OwnerProduct({ image, name, price, rate, reviews, quantity, sold, id }) {
	const [open, setOpen] = useState<Boolean>(false);
	async function removeProduct() {
		const response = await axios({
			method: "delete",
			withCredentials: true,
			url: `${API_URL}/product/${id}`,
		});
		if (response.status === 200) {
			window.location.reload();
		}
	}

	return (
		<div className="product">
			<div className="img-container">
				<img src={image} alt={"product-photo"} className="product-image" />
			</div>
			<div className="product-info">
				<div className="product-info-title_price">
					<h1 className="head">{name}</h1>
					<p className="owner-price">{price}</p>
				</div>
				<div className="product-info-rate">
					<Stars rate={rate} />
					<p>{reviews} Reviews </p>
				</div>
				<p>
					<span className="headline">Quantity : </span> {quantity}
				</p>
				<p>
					<span className="headline">Sold : </span> {sold}
				</p>
				<div className="product-info-buttons">
					<button className="remove-button border-radius" onClick={() => setOpen(true)}>
						Remove
					</button>
					<button className="edit-button border-radius">Edit</button>
				</div>
			</div>
			<ModalComponent
				modalTitle={"Delete Product"}
				isOpen={open}
				closeModal={() => setOpen(false)}
				text={"Are you sure you want to delete this item?"}
				targetAction={removeProduct}
			/>
		</div>
	);
}
