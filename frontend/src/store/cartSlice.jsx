import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart
const initialState = {
  carts: [], // Initial cart is empty
};

// Create a Redux slice for cart operations
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart with the specified quantity
    addToCart: (state, action) => {
      const newItem = action.payload;
      const { quantity } = newItem.selectedVariant;

      // Find if the item already exists in the cart
      const existingItem = state.carts.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Check if the specific variant (by size) already exists
        const existingVariant = existingItem.variants.find(
          (variant) => variant.size === newItem.selectedVariant.size
        );

        if (existingVariant) {
          // If variant exists, increase its quantity by the specified amount
          existingVariant.quantity += quantity;
        } else {
          // If variant doesn't exist, add it with the specified quantity
          existingItem.variants.push({
            ...newItem.selectedVariant,
            quantity,
          });
        }
      } else {
        // If the item doesn't exist in the cart, add it with its variant
        state.carts.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          variants: [{ ...newItem.selectedVariant, quantity }],
        });
      }
    },

    // Action to remove or decrease item/variant from the cart
    deleteFromCart: (state, action) => {
      const { id, size } = action.payload;

      // Find the index of the existing item in the cart
      const existingItemIndex = state.carts.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const variants = state.carts[existingItemIndex].variants;

        // Find the specific variant to be removed or reduced
        const existingVariantIndex = variants.findIndex(
          (variant) => variant.size === size
        );

        if (existingVariantIndex !== -1) {
          const existingVariant = variants[existingVariantIndex];

          if (existingVariant.quantity > 1) {
            // Decrease quantity if it's greater than one
            existingVariant.quantity -= 1;
          } else {
            // If only one quantity, remove the variant
            variants.splice(existingVariantIndex, 1);

            if (variants.length === 0) {
              // If no variants are left, remove the item entirely
              state.carts.splice(existingItemIndex, 1);
            }
          }
        }
      }
    },
  },
});

// Export the action creators for cart operations
export const { addToCart, deleteFromCart } = cartSlice.actions;

// Export the reducer for Redux store integration
export default cartSlice.reducer;
