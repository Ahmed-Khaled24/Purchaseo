import React, { useEffect, useState } from "react";
import "../css/item.css";
import Stars from "./Stars";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, CartState } from "../store/features/cartSlice";
import { toast } from "react-toastify";

const API_URL = "https://localhost:4000";
export default function Item() {
	const dispatch = useDispatch();
	const cart: CartState = useSelector(
		(state: { cart: CartState }) => state.cart
	);
	let [image, setImage] = useState("/items/item10.jpg");
	const[productImages,setProductImages]=useState([]);
	let [data, setData] = useState({
		product_id: 0,
		added_by: 0,
		product_name: "",
		inventory: 0,
		price: 0,
		rating: 0,
		description: "",
	});
	const params = useParams();
	useEffect(() => {
		(async () => {
			try{
				const prodData = await axios.get(
					`${API_URL}/product/${params.id}`
				);
				console.log("prod data is" ,prodData.data.data.product)
				setData(prodData.data.data.product);
				const prodImgs = await axios({
					method: "get",
					url: `${API_URL}/product/image/${params.id}`,
				})
				console.log("prod images are" ,prodImgs.data.data);
				setProductImages(prodImgs.data.data);
				setImage(prodImgs.data.data[0].file_path);

			}catch(error){
				toast.error("Failed to get all product Data",{
					position:"bottom-left"
				})
			}
		})();
	}, [params.id]);

	const handleAddToCart = () => {
		const cartItem = {
			id: data?.product_id,
			title: data?.product_name,
			price: data?.price,
			image: productImages[0].file_path,
			rating: data?.rating,
			cartQuantity: 0
		}
		console.log({cartItem});
		dispatch(addToCart(cartItem));

	};
	function changeImage(e) {
		setImage(e.target.src);
	}

	return (
		<div className="item-preview">
			<div className="item-info">
				<div className="images">
					<div className="main-image-container">
						<img src={image} className="border-radius main-image" />
					</div>
					<div className="other-images">
						{productImages.map((image, index) => (
						<img
							key={index}
							src= {image.file_path}
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						))}
						
					</div>
				</div>
				<div className="item-text">
					<h1>{data?.product_name}</h1>
					<div className="rate">
						<Stars rate={data?.rating} />
						<p>&#8226;</p>
						{/* TODO: Reviews needs to be changed by the database */}
						<p>{30} Reviews</p>
					</div>

					<div className="desc-title">Description</div>
					<p className="desc-text">{data?.description}</p>
					<div className="buying">
						<button
							className="purchase-button"
							onClick={() => handleAddToCart()}
						>
								<img src="/shopping-bag-white.png" />
								Add To Cart
						</button>
						<div className="price">{data?.price}$</div>
					</div>
				</div>
			</div>
			<div className="reviews-area">
				<div>
					<div className="reviews-selection">
						<NavLink to={`/${data?.product_id}`} className="add-review">
							Reviews
						</NavLink>
						<NavLink to="add-review" className="add-review">
							Add Review
						</NavLink>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
