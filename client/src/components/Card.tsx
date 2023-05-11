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
                <div>
                    <h1 className="card--title" >{prop.title.substring(0, 20)}...</h1>
                    <span>
                        <Stars
                            rate={prop.rating}
                        />
                    </span>
                    <p className="card--price" style={{
                        display: "flex",
                    }}>{prop.price}$ </p>
                </div>
            </div>
            <button className="add-button border-radius">Add to Cart</button>
        </div>
    )
}