import React from "react";
import { NavLink } from "react-router-dom";

import "../css/navbar.css"

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/"><img src="/logo.png" alt="logo" className="logo" /></NavLink>
      <input type="search" name="search" placeholder="Search ..." className="nav-search" />
      <ul className="nav-right">
        <li ><NavLink to="" className="nav-item">Add Product</NavLink></li>
        <li ><NavLink to="/login" className="nav-item">My Products</NavLink></li>
        {/* Place Holder for the image of the user when he is logged in */}
      </ul>
    </nav>
  )
}