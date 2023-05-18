import React from "react";
import OwnerProduct from "./Owner-Product";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { Product } from "../../../server/types/Product";
import API_URL from "../KEYS";

export default function OwnerItems() {
	const [items, setItems] = React.useState([]);
	const user = useSelector((state: RootState) => state.user);
	useEffect(() => {
		axios({
			withCredentials: true,
			method: "get",
			url: `${API_URL}/product/seller/${user.user_id}`,
		}).then((res) => {
			setItems(res.data.data);
		});
	}, []);
	return (
		<div className="owner-items">
			{items.length === 0 && <h1 className="empty-products-placeholder"> No items to show </h1>}
			{items.map((item, index) => (
				// TODO: Add reviews and products
				<OwnerProduct
					price={item.price}
					key={index}
					name={item.product_name}
					rate={item.rating}
					reviews={"0"}
					image={item.images[0]}
					sold={item.sold_quantity}
					quantity={item.inventory}
					id={item.product_id}
				/>
			))}
		</div>
	);
}
