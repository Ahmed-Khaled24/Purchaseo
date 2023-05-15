import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import "../css/home-products.css"
import Stars from "./Stars";

//It fetches data and display products page
export default function Products() {
  const dispatch = useDispatch();
  const { category } = useParams();
  let AllProducts = null;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [rate, setRate] = useState(5);

  const handleMinChange = (e) => {
    setMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    setMax(e.target.value);
  };

  const onFilter = () => {
    const filteredComponents = data.filter(
      (component) => component.price >= min && component.price <= max
    );
    setFilter(filteredComponents);
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setData(data);
      const filterProduct = (category) => {
        const updatedList = data.filter((x) => x.category === category);
        setFilter(updatedList);

      }
      filterProduct(category);
    };
    getProducts();
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  function handleStarHover(index) {
    setRate(index + 1);
  }

  function handleStarLeave() {
    setRate(0);
  }


  //It holds all the products of the chosen category 
  AllProducts = filter.map((product) => {
    handleAddToCart(product);
    return (
      <Card
        id={product.id}
        image={product.image}
        title={product.title}
        price={product.price}
        rating={product.rating.rate}
        category={product.category}
      />
    );
  });

  return (
<div>
<h1 className="Category--title">{category}</h1>
    <div className="CategoryPage">
     
      <div className="filter-bar">
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }} >
          <p>Rating</p>

          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rate ? "/star-filled.png" : "/star.png"}
                className="star"
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
              />
            ))}
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }} >
          <p>Price Range</p>
          <div className="filter-bar">
            <p>Min:</p>
            <input
              type="number"
              min="0"
              max="Infinity"
              placeholder="Min Price"
              value={min}
              onChange={handleMinChange}
            />
            <p>Max:</p>
            <input
              type="number"
              min="0"
              max="Infinity"
              placeholder="Max Price"
              value={max}
              onChange={handleMaxChange}
            />
            <div />

          </div>
        </div>
        <button className="filter-button" onClick={onFilter}>Filter</button>
      </div>
      <div className="cards">
        {AllProducts}
      </div>
    </div>
</div>
   

  )
}