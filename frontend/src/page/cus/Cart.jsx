import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="p-8">
      <h2 className="font-normal text-2xl text-center">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/" className="text-gray-600 flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="mt-4">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="grid grid-cols-4 gap-4 mt-4" key={cartItem.id}>
                  <div className="border-t border-gray-300 py-4 flex items-center">
                    <img src={cartItem.image} alt={cartItem.name} className="w-24 h-24 mr-4"/>
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)} className="border-none outline-none mt-3 cursor-pointer text-gray-500 hover:text-black">Remove</button>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-center">
                    ${cartItem.price}
                  </div>
                  <div className="w-1/3 flex justify-center">
                    <button onClick={() => handleDecreaseCart(cartItem)} className="border-none outline-none mt-3 cursor-pointer text-gray-500 hover:text-black">-</button>
                    <div className="border border-gray-200 rounded-md mx-2 p-2">
                      <span className="text-sm">{cartItem.cartQuantity}</span>
                    </div>
                    <button onClick={() => handleAddToCart(cartItem)} className="border-none outline-none mt-3 cursor-pointer text-gray-500 hover:text-black">+</button>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8">
            <div className="flex justify-between">
              <button onClick={() => handleClearCart()} className="w-1/3 h-10 border border-gray-200 rounded-md font-normal tracking-wide text-gray-500 hover:bg-gray-100 outline-none">Clear Cart</button>
              <div className="w-2/3 text-right">
                <div className="text-lg font-bold">Subtotal: <span className="text-gray-700">${cart.cartTotalAmount}</span></div>
                <p className="text-sm font-light mt-2">Taxes and shipping calculated at checkout.</p>
                <button className="w-full h-10 bg-blue-500 text-white rounded-md font-normal tracking-wide mt-4 hover:bg-blue-600">Check out</button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg text-gray-600">Continue Shopping</p>
            <Link to="/" className="text-gray-600 flex items-center mt-2"><span>←</span> Back to Shop</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
