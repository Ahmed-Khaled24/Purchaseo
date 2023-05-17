import React from "react";
import OwnerProduct from "./Owner-Product";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { Product } from "../../../server/types/Product";

export default function OwnerItems() {
	const [items, setItems] = React.useState<Product[]>([]);
	const user = useSelector((state: RootState) => state.user);
	useEffect(() => {
		axios({
			method: "get",
			url: `http://localhost:4000/product/seller/${user.user_id}`,
		}).then((res) => {
			setItems(res.data.data);
		});
	}, []);
	return (
		<div className="owner-items">
			{items.length === 0 && <h1>No items to show</h1>}
			{items.map((item: Product, index) => (
        // TODO: Add reviews and products
				<OwnerProduct
          price={item.price}
					key={index}
					name={item.product_name}
					rate={item.rating}
					reviews={"haha"}
					desc={item.description}
				/>
			))}
		</div>
	);
}
