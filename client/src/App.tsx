import "./app.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBarNormal";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Item from "./components/Item";
import Cart from "./components/Cart";
import AddReview from "./components/Add-Review";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import OwnerItems from "./components/OwnerItems";
import UserPage from "./components/UserPage";
import Container from "./components/Container";
import CreateAccountContainer from "./components/CreateAccountContainer";
import ResetPass from "./components/ResetPass";
import NewPass from "./components/NewPass";
import AddProduct from "./components/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "./store/features/userSlice";
import OrderRedirect from "./components/OrderRedirect";
import { NotFound } from "./components/NotFound";
import API_URL from "./KEYS";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const userResponse = await axios({
				withCredentials: true,
				method: "GET",
				url: `${API_URL}/user`,
			});
			if (userResponse.status === 200) {
				dispatch(putUser(userResponse.data.data));
			} else {
				window.location.href = "/sign-in";
			}
		})();
	}, []);
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer />
				<NavBar />
				<Routes>
					<Route path="/">
						<Route path="/orders/redirect/:status" element={<OrderRedirect />} />
						<Route index element={<Home />} />
						<Route path="/seller">
							<Route index element={<OwnerItems />} />
							<Route path="add-product" element={<AddProduct />} />
						</Route>
						<Route path="/category/:category" element={<Products />} />
						<Route path="/products/:id" element={<Item />}>
							<Route path="/products/:id/:productId" element={<Reviews />} />
							<Route path="add-review" element={<AddReview />} />
						</Route>
						<Route path="/cart" element={<Cart />} />
						<Route path="/myPage" element={<UserPage />} />
						<Route path="/sign-in" element={<Container />} />
						<Route path="/sign-up" element={<CreateAccountContainer />} />
						<Route path="/forget-password" element={<ResetPass />} />
						<Route path="/reset-password/:token" element={<NewPass />} />
						<Route path="/add-product" element={<AddProduct />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
