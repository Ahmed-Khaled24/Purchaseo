import React from "react"
import { useNavigate,NavLink } from 'react-router-dom';
// It represents the each category in the home page Ex: Ovens
export default function Box(props) {
    return (
        <div className={props.name + ' home-card'}>
            <h3 className="title">{props.head}</h3>
            <img src={props.img} className={props.Nimg} />
            <NavLink to={`/category/${props.category}`} >
            <button className={props.buttonName}>See more</button>
            </NavLink>           
        </div>
    )
}
