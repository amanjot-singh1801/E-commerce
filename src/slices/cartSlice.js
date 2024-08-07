import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],      
    showCart: false 
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        
        add(state, action) {
            const itemExists = state.cart.find(item => item._id === action.payload._id);
            if (!itemExists) {
                state.cart.push(action.payload); 
            }
        },
       
        remove(state, action) {
            state.cart = state.cart.filter(item => item._id !== action.payload);
        },
       
        setShowCart(state, action) {
            state.showCart = true;
        },
       
        noShowCart(state) {
            state.showCart = false;
        },
        resetCart: (state) => {
            state.cart = []
        },
    }
});


export const { add, remove, setShowCart, noShowCart,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
