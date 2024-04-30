import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart
const initialState = {
  carts: [],
};

// Create a Redux slice for cart operations
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.carts.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If item exists, check if the variant (based on size) exists
        const existingVariant = existingItem.variants.find(
          (variant) => variant.size === newItem.selectedVariant.size
        );

        if (existingVariant) {
          // If variant exists, increase its quantity
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

    // Action to delete an item or its variant from the cart
    deleteFromCart: (state, action) => {
      const { id, size } = action.payload;

      // Find the index of the item in the cart
      const existingItemIndex = state.carts.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const variants = state.carts[existingItemIndex].variants;

        // Find the index of the variant to be deleted
        const existingVariantIndex = variants.findIndex(
          (variant) => variant.size === size
        );

        if (existingVariantIndex !== -1) {
          const existingVariant = variants[existingVariantIndex];

          if (existingVariant.quantity > 1) {
            // Decrease quantity if more than one
            existingVariant.quantity -= 1;
          } else {
            // If only one, remove the variant
            variants.splice(existingVariantIndex, 1);

            // If no more variants, remove the item from the cart
            if (variants.length === 0) {
              state.carts.splice(existingItemIndex, 1);
            }
          }
        }
      }
    },
  },
});

// Export the action creators for adding and deleting from the cart
export const { addToCart, deleteFromCart } = cartSlice.actions;

// Export the reducer to be used in the Redux store
export default cartSlice.reducer;
