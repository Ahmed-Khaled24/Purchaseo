import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
  cartTotalAmount: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: {
    rate: number;
  };
  cartQuantity: number;
}
const initialState={
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
};
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const existingIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
              );
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                  ...state.cartItems[existingIndex],
                  cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                };} 
                else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
              }
      
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            );
      
            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1;

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              );
      
              state.cartItems = nextCartItems;
            }
      
          },
          removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
              if (cartItem.id === action.payload.id) {
                const nextCartItems = state.cartItems.filter(
                  (item) => item.id !== cartItem.id
                );
      
                state.cartItems = nextCartItems;

              }
       
            });
          },
          getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
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
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
          },
          clearCart(state) {
            state.cartItems = [];
          },

    },
});
export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;