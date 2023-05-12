import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  CartState,
} from "../features/cartSlice";
import "../css/cart.css"
import { Link } from "react-router-dom";
import Stars from "./Stars";
export default function Cart() {
    
    const dispatch = useDispatch();
    const cart: CartState = useSelector((state: {cart: CartState}) => state.cart);
    
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

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {
               cart.cartItems.length === 0? (
                <div className="cart-empty">
                  <p className="w" >Your cart is currently empty...</p>
                  <div className="start-shopping">
                    <Link to="/">
                     <button className="buttonhome">
                        Start Shopping
                     </button>
                    </Link>
                  </div>
                </div>
              ) :
              (
                <div className="-items" style={{
                    display:"flex",
                    flexDirection: "row"
                }}>
                 
                  <div className="cart-items">
                    {cart.cartItems &&
                      cart.cartItems.map((cartItem) => (
                        <div className="cart-product">
                        <div className="img-cart">
                            <img src={cartItem.image} alt={cartItem.name} className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="cart-info-title_price">
                                <h1 className="head">No name
                                     {cartItem.name} 
                                </h1>
                                <p className="Quantity-price">{cartItem.price * cartItem.cartQuantity}$</p>
                            </div>
                            <div className="product-info-rate">
                                <Stars rate={cartItem.rating.rate} />
                                <p >&#8226;</p>
                                <p>10 Reviews</p>
                            </div>
                            <p>
                            <span className="headline">Price : </span>
                            <span style={{
                                fontSize:"1.35rem"
                            }}>{cartItem.price}$</span>
                            </p>
                            <div className="cart-info-buttons">
                                <button className="remove-button border-radius"  onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                <div className="cart-product-quantity">
                                    <button className="cart-product-quantityL"  onClick={() => handleDecreaseCart(cartItem)}>
                                        -
                                    </button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button className="cart-product-quantityR" onClick={() => handleAddToCart(cartItem)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     ))}
                  </div>
                  <div className="cart-summary">
                    <div className="cart-checkout">
                      <div className="total">
                        <span>Total</span>
                        <span className="amount">${cart.cartTotalAmount}</span>
                      </div>
                      <button className="clear-btn" onClick={() => handleClearCart()}>
                      Clear Cart
                    </button>
                      <button className="check-btn">Check out</button>
                      <div className="continue-shopping">
                        <Link to="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-arrow-left"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                            />
                          </svg>
                          <span>Continue Shopping</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
    )
}

