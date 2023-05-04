import React from "react";
import { NavLink } from 'react-router-dom';
import "../css/Nav.css"
export default function NavBar() {
  return (
    <nav>
      <a href="https://www.google.com"><img src="/logo.png"alt="logo" className="logo" /></a>
      <input type="text" name="search" placeholder="Search..." className="nav-search" />
      <ul className="nav-right">
        <li ><a href="" className="nav-item">Categories</a></li>
        <li ><a href="" className="nav-item">Deals</a></li>
        <li ><a href="" className="nav-item">Wishlist</a></li>
        <li ><a href="" className="nav-item">Login</a></li>
        <NavLink to={`/cart`} >
        <li ><a href="" className="nav-item"><img src="/shopping-bag.png" alt="" /></a></li>
        </NavLink>
      </ul>
    </nav>
  )
}
