import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, CartItem } from "../store/features/cartSlice";
import "../css/cart.css";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import { RootState } from "../store/store";
import axios from "axios";
import API_URL from "../KEYS";

export default function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};
	const handleDecreaseCart = (product) => {
		dispatch(decreaseCart(product));
	};
	const handleRemoveFromCart = (product) => {
		dispatch(removeFromCart(product));
	};
	const handleClearCart = () => {
		dispatch(clearCart());
	};

	async function handleCheckout() {
		const cartItems: CartItem[] = cart.cartItems;
		const paymentRequestBody = cartItems.map((item) => {
			return {
				product_id: item.id,
				quantity: item.cartQuantity,
				pricePerUnit: item.price,
				images: [item.image],
				name: item.title,
			};
		});
		const paymentSessionURL = await axios({
			method: "POST",
			withCredentials: true,
			url: `${API_URL}/payment`,
			data: {
				products: paymentRequestBody,
			},
		});
		if (paymentSessionURL.status === 200) {
			window.location.href = paymentSessionURL.data.data;
		}
	}

	return (
		<div className="cart-container">
			<h1>Cart</h1>
			{cart.cartItems.length === 0 ? (
				<div className="cart-empty">
					<p className="w">Your cart is currently empty...</p>
					<div className="start-shopping">
						<Link to="/">
							<button className="buttonhome">Start Shopping</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="-items">
					<div className="cart-items">
						{cart.cartItems &&
							cart.cartItems.map((cartItem) => (
								<div className="cart-product">
									<img
										src={cartItem.image}
										alt={cartItem.product_name}
										className="product-image-cart"
									/>
									<div className="product-info">
										<div className="cart-info-title_price">
											<h1 className="head">{cartItem.title}</h1>
											<p className="Quantity-price">{cartItem.price * cartItem.cartQuantity}$</p>
										</div>
										<div>
											<Stars rate={cartItem.rating} />
										</div>
										<p>
											<span className="headline">Price : </span>
											<span
												style={{
													fontSize: "1.35rem",
												}}
											>
												{cartItem.price}$
											</span>
										</p>
										<div className="cart-info-buttons">
											<button
												className="remove-button border-radius"
												onClick={() => handleRemoveFromCart(cartItem)}
											>
												Remove
											</button>
											<div className="cart-product-quantity">
												<button
													className="cart-product-quantityL"
													onClick={() => handleDecreaseCart(cartItem)}
												>
													-
												</button>
												<div className="count">{cartItem.cartQuantity}</div>
												<button
													className="cart-product-quantityR"
													onClick={() => handleAddToCart(cartItem)}
												>
													+
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
					<div className="cart-summary">
						<div className="continue-shopping">
							<Link to="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									viewBox="0 0 16 16"
									className="CS-word"
								>
									<path
										fillRule="evenodd"
										d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
									/>
								</svg>
								<span className="CS-word">Continue Shopping</span>
							</Link>
						</div>
						<div className="cart-checkout">
							<div className="total">
								<span>Total</span>
								<span className="amount">${cart.cartTotalAmount}</span>
							</div>
							<div className="total">
								<span>Tax</span>
								<span className="amount">$0</span>
							</div>
							<div className="total">
								<span>Shipping</span>
								<span className="amount">$0</span>
							</div>
							<div className="checkout-buttons">
								<button className="clear-btn" onClick={handleClearCart}>
									Clear Cart
								</button>
								<button className="check-btn" onClick={handleCheckout}>
									Check out
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
