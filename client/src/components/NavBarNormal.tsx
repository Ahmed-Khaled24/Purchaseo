import React, { useState, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import defaultProfilePic from "../../public/images/defaultProfilePic.jpg";
import "../css/navbar.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/features/userSlice";
import axios from "axios";

const API_URL = "https://localhost:4000";

export default function NavBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);

	async function handleLogout() {
		const response = await axios({
			withCredentials: true,
			method: "DELETE",
			url: `${API_URL}/auth/logout`,
		});
		if (response.status === 200) {
			dispatch(logoutUser());
			navigate("/sign-in");
		}
	}

	return (
		<nav>
			<NavLink to="/" className="nav-item logo">
				purchaseo
			</NavLink>
			<input
				type="search"
				name="search"
				placeholder="Type something..."
				className="nav-search"
				autoComplete="false"
			/>
			<div className="nav-right">
				{user.role === "Customer" ? (
					<Fragment>
						<NavLink to="" className="nav-item">
							Categories
						</NavLink>
						<NavLink to="/cart" className="nav-item">
							<img src="/shopping-bag.png" alt="" />
						</NavLink>
					</Fragment>
				) : (
					<Fragment>
						<NavLink to="/seller/add-product" className="nav-item">
							Add Product
						</NavLink>
						<NavLink to="/seller" className="nav-item">
							My Products
						</NavLink>
					</Fragment>
				)}
				{user.email ? ( // if the user is logged in
					<Fragment>
						<NavLink to="/" onClick={handleLogout} className={"nav-item"}>
							Logout
						</NavLink>
						<NavLink to="/myPage" className="nav-item">
							<img
								src={user.image_url || defaultProfilePic}
								alt="my account"
								className="profile-pic-nav"
							/>
						</NavLink>
					</Fragment>
				) : (
					<NavLink to="/sign-in" className="nav-item">
						Login
					</NavLink>
				)}
			</div>
		</nav>
	);
}
