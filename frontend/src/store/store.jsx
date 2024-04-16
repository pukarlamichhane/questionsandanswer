import { configureStore } from '@reduxjs/toolkit'; 
import cartReducer from './cartSlice'; // Importing without curly braces

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  devTools: true
});
