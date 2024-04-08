import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    carts: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.carts.find(item => item.id === newItem.id);
            if (existingItem) {
                const existingVariant = existingItem.variants.find(variant => variant.size === newItem.selectedVariant.size);
                if (existingVariant) {
                    existingVariant.quantity++;
                } else {
                    existingItem.variants.push({ ...newItem.selectedVariant, quantity: 1 });
                }
            } else {
                state.carts.push({
                    id: newItem.id,
                    name: newItem.name,
                    image: newItem.image,
                    variants: [{ ...newItem.selectedVariant, quantity: 1 }]
                });
            }
        },
        deleteFromCart: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.carts.findIndex(item => item.id === id);
            if (existingItemIndex !== -1) {
                const existingVariantIndex = state.carts[existingItemIndex].variants.findIndex(variant => variant.size === size);
                if (existingVariantIndex !== -1) {
                    if (state.carts[existingItemIndex].variants[existingVariantIndex].quantity > 1) {
                        state.carts[existingItemIndex].variants[existingVariantIndex].quantity--;
                    } else {
                        state.carts[existingItemIndex].variants.splice(existingVariantIndex, 1);
                        if (state.carts[existingItemIndex].variants.length === 0) {
                            state.carts.splice(existingItemIndex, 1);
                        }
                    }
                }
            }
        }
    }
});

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;