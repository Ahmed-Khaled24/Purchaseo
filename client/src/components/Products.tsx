import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import "../css/home-products.css";
import axios from "axios";

const API_URL = "https://localhost:4000";

//It fetches data and display products page
export default function Products() {
	const { category } = useParams();
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(10000);
	const [rate, setRate] = useState(0);

	const handleMinChange = (e) => {
		setMin(e.target.value);
	};

	const handleMaxChange = (e) => {
		setMax(e.target.value);
	};

	const onFilter = () => {
		const filteredComponents = data.filter(
			(component) => component.price >= min && component.price <= max && component.rating >= rate
		);
		setFilteredData(filteredComponents);
		console.log(rate);
	};

	useEffect(() => {
		(async () => {
			const prodData = await axios.get(`${API_URL}/categories?category=${category}`);
			setData(prodData.data.data);
			setFilteredData(prodData.data.data);
		})();
	}, [category]);

	let set = true;
	function handleStarHover(index) {
		if (set) setRate(index + 1);
	}

	function handleStarLeave() {
		if (set) setRate(0);
	}

	function handleSet(index) {
		set = false;
		setRate(index + 1);
	}

	//It holds all the products of the chosen category
	const AllProducts = filteredData.map((product) => {
		return (
			<Card
				key={product?.product_id}
				id={product?.product_id}
				image={product?.images[0]}
				title={product?.product_name}
				price={product?.price}
				rating={product?.rating}
			/>
		);
	});

	return (
		<div>
			<h1 className="Category--title">
				{category === "women" || category === "men" || category === "kids" ? `${category}'s Clothes` : category}
			</h1>
			<div className="CategoryPage">
				<div className="filter">
					<p style={{ fontSize: "1.7rem" }}>{AllProducts.length} Items found</p>
					<hr></hr>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
							marginTop: "2rem",
						}}
					>
						<p className="word-filter">Rating</p>
						<div className="star-rating">
							{[...Array(5)].map((_, index) => (
								<img
									key={index}
									src={index < rate ? "/star-filled.png" : "/star.png"}
									className="star"
									onMouseEnter={() => handleStarHover(index)}
									onMouseLeave={handleStarLeave}
									onClick={() => handleSet(index)}
								/>
							))}
						</div>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1.5rem",
						}}
					>
						<p className="word-filter">Price Range</p>
						<div>
							<p className="word1-filter">Min:</p>
							<input
								type="number"
								min="0"
								max="Infinity"
								placeholder="Minimum Price"
								value={min}
								onChange={handleMinChange}
							/>
							<p className="word1-filter">Max:</p>
							<input
								type="number"
								min="0"
								max="Infinity"
								placeholder="Maximum Price"
								value={max}
								onChange={handleMaxChange}
							/>
						</div>
					</div>
					<button className="filter-button" onClick={onFilter}>
						Filter
					</button>
				</div>
				{AllProducts.length === 0 ? <div className='no-products-placeholder'> No Products found</div> : <div className="cards">{AllProducts}</div>}
			</div>
		</div>
	);
}
