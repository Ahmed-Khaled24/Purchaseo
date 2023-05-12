import Stars from "./Stars";
import { NavLink } from "react-router-dom";

//The container of the product
export default function Card(prop) {
    return (
        <div className="card">
            <div key={prop.id}>
                <NavLink to={`/products/${prop.category}/${prop.id}`} >
                    <img src={prop.image} alt={prop.title} height="200px" className="card--image" />
                </NavLink>
                <div style={{
                     maxHeight: "20.2rem",
                     minWidth: "18.5rem"
                }}>
                    <h1 className="card--title" >{prop.title.substring(0, 20)}...</h1>
                    <span>
                        <Stars
                            rate={prop.rating}
                        />
                    </span>
                    <span className="rw">
                    <p className="card--price" style={{
                        display: "flex",
                        fontSize:"1.2rem"
                    }}>{prop.price}$ </p>    
                    <button className="add-button border-radius">Add to Cart</button>
                    </span>
                </div>
            </div>
        </div>
    )
}