import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [], // Initialize with an empty cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.carts.find((item) => item.id === newItem.id); // Check if item exists

      if (existingItem) {
        const existingVariant = existingItem.variants.find(
          (variant) => variant.size === newItem.selectedVariant.size
        ); // Find the correct variant by size

        if (existingVariant) {
          // If variant exists, increase quantity
          existingVariant.quantity += 1;
        } else {
          // If variant doesn't exist, add it with initial quantity
          existingItem.variants.push({
            ...newItem.selectedVariant,
            quantity: 1,
          });
        }
      } else {
        // If item doesn't exist, add it to the cart
        state.carts.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          variants: [{ ...newItem.selectedVariant, quantity: 1 }],
        });
      }
    },

    deleteFromCart: (state, action) => {
      const { id, size } = action.payload; // Get item ID and variant size from the action
      const existingItemIndex = state.carts.findIndex((item) => item.id === id); // Find item by ID

      if (existingItemIndex !== -1) {
        const variants = state.carts[existingItemIndex].variants; // Get variants for the existing item
        const existingVariantIndex = variants.findIndex(
          (variant) => variant.size === size
        ); // Find the variant by size

        if (existingVariantIndex !== -1) {
          const existingVariant = variants[existingVariantIndex]; // Get the variant

          if (existingVariant.quantity > 1) {
            // Decrease quantity if it's greater than one
            existingVariant.quantity -= 1;
          } else {
            // Remove the variant if the quantity is one
            variants.splice(existingVariantIndex, 1);

            if (variants.length === 0) {
              // If no variants are left, remove the item
              state.carts.splice(existingItemIndex, 1);
            }
          }
        }
      }
    },
  },
});

// Export action creators for each case reducer function
export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer; // Export the reducer for the Redux store
