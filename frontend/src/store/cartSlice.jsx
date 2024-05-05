import { createSlice } from "@reduxjs/toolkit";

// Helper function to save the cart to local storage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedState);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Helper function to load the cart from local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { carts: [] }; // Default initial state if there's nothing in local storage
    }
    return JSON.parse(serializedState); // Parse and return the saved cart state
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { carts: [] }; // Fallback if there's an error
  }
};

const initialState = loadCartFromLocalStorage(); // Load the initial state from local storage

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.carts.find(
        (item) =>
          item.name === newItem.name &&
          item.image === newItem.image &&
          item.variants.some(
            (variant) => variant._id === newItem.selectedVariant._id
          )
      );

      if (existingItem) {
        const existingVariant = existingItem.variants.find(
          (variant) => variant._id === newItem.selectedVariant._id
        );
        existingVariant.quantity += 1;
      } else {
        state.carts.push({
          name: newItem.name,
          image: newItem.image,
          variants: [{ ...newItem.selectedVariant, quantity: 1 }],
        });
      }

      // Save the updated cart state to local storage
      saveCartToLocalStorage(state);
    },
    deleteFromCart: (state, action) => {
      const { variantId } = action.payload;
      const existingItemIndex = state.carts.findIndex((item) =>
        item.variants.some((variant) => variant._id === variantId)
      );

      if (existingItemIndex !== -1) {
        const variants = state.carts[existingItemIndex].variants;
        const existingVariantIndex = variants.findIndex(
          (variant) => variant._id === variantId
        );

        if (existingVariantIndex !== -1) {
          const existingVariant = variants[existingVariantIndex];
          if (existingVariant.quantity > 1) {
            existingVariant.quantity -= 1;
          } else {
            variants.splice(existingVariantIndex, 1);
            if (variants.length === 0) {
              state.carts.splice(existingItemIndex, 1);
            }
          }
        }
      }

      // Save the updated cart state to local storage
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
