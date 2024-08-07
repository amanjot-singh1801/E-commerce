import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    editMode:false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload; 
        },
        addProduct(state, action) {
            state.products.push(action.payload); 
        },
        setEditMode(state,action){
            state.editMode = action.payload;
        }
    },
});

export const { setProducts, addProduct,setEditMode } = productSlice.actions;
export default productSlice.reducer;