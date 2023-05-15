import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Card from "./Card";
import "../css/home-products.css"
import axios from 'axios';

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
      const prodData = await axios.get(`https://localhost:8000/categories?category=${category}`)
      setData(prodData.data.data);
      setFilteredData(prodData.data.data);
    })();
  }, [category]);


let set=true;
  function handleStarHover(index) {
    if(set)
    setRate(index + 1);
  }

  function handleStarLeave() {
    if(set)
    setRate(0);
  }

  function handleSet(index){
    set=false;
    setRate(index+1);
  }

  //It holds all the products of the chosen category 
  const AllProducts = filteredData.map((product) => {
    return (
      <Card
        key={product?.product_id}
        id={product?.product_id}
        image={product?.image}
        title={product?.product_name}
        price={product?.price}
        rating={product?.rating}
      />
    );
  });

  return (
    <div>
      <h1 className="Category--title">Products</h1>
      <div className="CategoryPage">
        <div className="filter-bar">
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop:"7rem"
          }} >
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
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }} >
            <p className="word-filter">Price Range</p>
            <div className="filter-bar">
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
          <button className="filter-button" onClick={onFilter}>Filter</button>
        </div>
        <div className="cards">
          {AllProducts}
        </div>
      </div>
    </div>
  )
}