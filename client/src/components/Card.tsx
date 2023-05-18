import { useDispatch } from "react-redux";
import Stars from "./Stars";
import { NavLink } from "react-router-dom";
import { addToCart } from "../store/features/cartSlice";

//The container of the product
export default function Card(prop) {
	const dispatch = useDispatch();
	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};
	return (
		<div className="card">
			<div key={prop.id} className={"card-content-wrapper"}>
				<NavLink to={`/products/${prop.id}`}>
					<img
						src={prop.image}
						alt={prop.title}
						height="200px"
						className="card--image"
					/>
				</NavLink>
				<div
					style={{
						width: "100%",
					}}
				>
					<h1 className="card--title">
						{prop.title.substring(0, 20)}
					</h1>
					<p
							className="card--price"
							style={{
								display: "flex",
								fontSize: "1.3rem",
								fontWeight:"bold",
								marginBlock:"1rem"
							}}
						>
							{prop.price}${" "}
						</p>
					<span>
					
					</span>
					<span className="rw">
					<Stars rate={prop.rating} />
						<button
							className="add-button border-radius"
							onClick={() => handleAddToCart(prop)}
						>
							Add to Cart
						</button>
					</span>
				</div>
			</div>
		</div>
	);
}
