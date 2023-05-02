import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Card from "./card";
//It fetches data and display products page
export default function Products() {
    
    const {category} = useParams(); 
    let AllProducts = null;
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    
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
  
  //It holds all the products of the chosen category 
    AllProducts = filter.map(product => {

        return (
          <Card
          id={product.id}
         image={product.image}
         title= {product.title}
         price= {product.price}
         rating={product.rating.rate}
         category={product.category}
          />
        );
    });
    return (
        <div>
            <div>
                <h1 className="Category--title">{category}</h1>
                <div className="cards">
                    {AllProducts}
                </div>
            </div>
        </div>

    )
}