import { configureStore } from '@reduxjs/toolkit'; 
import cartReducer from './cartSlice'; // Importing without curly braces

export const store = configureStore({
  reducer: {
    cart: cartReducer // Using the imported reducer
  },
  devTools: true
});
