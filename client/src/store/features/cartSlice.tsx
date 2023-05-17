import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { toast } from "react-toastify";

export interface CartState {
  cartItems: CartItem[];
  cartTotalAmount: number;
  cartTotalQuantity:number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  cartQuantity: number;
}

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) =>
      produce(state, (draftState) => {
        const existingIndex = draftState.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (existingIndex >= 0) {
          draftState.cartItems[existingIndex].cartQuantity += 1;
          toast.info("Increased product quantity", {
            position: "bottom-left",
          });
        } else {
          let tempProductItem = { ...action.payload, cartQuantity: 1 };
          draftState.cartItems.push(tempProductItem);
          toast.success("Product added to cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(draftState.cartItems));
      }),

    decreaseCart: (state, action) =>
      produce(state, (draftState) => {
        const itemIndex = draftState.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (draftState.cartItems[itemIndex].cartQuantity > 1) {
          draftState.cartItems[itemIndex].cartQuantity -= 1;
          localStorage.setItem("cartItems", JSON.stringify(draftState.cartItems));
        } else if (draftState.cartItems[itemIndex].cartQuantity === 1) {
          const nextCartItems = draftState.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
          draftState.cartItems = nextCartItems;
          localStorage.setItem("cartItems", JSON.stringify(draftState.cartItems));
        }
      }),

    removeFromCart: (state, action) =>
      produce(state, (draftState) => {
        const nextCartItems = draftState.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        draftState.cartItems = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(draftState.cartItems));
      }),

    getTotals: (state) =>
      produce(state, (draftState) => {
        let { total, quantity } = draftState.cartItems.reduce(
          (cartTotal, cartItem) => {
            const { price, cartQuantity } = cartItem;
            const itemTotal = price * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
        total = Math.round(total);
        draftState.cartTotalQuantity = quantity;
        draftState.cartTotalAmount = total;
      }),

    clearCart: (state) =>
      produce(state, (draftState) => {
        draftState.cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(draftState.cartItems));
      }),
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;