import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("pharmaCart")) || [];
    setCartItems(cart);
  }, []);

  // Update localStorage and dispatch event
  const updateCart = (newCart) => {
    localStorage.setItem("pharmaCart", JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove entire item
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  // Decrease quantity by one
  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  // Increase quantity by one
  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Calculate totals
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-white cursor-pointer hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
      >
        <FaArrowLeft className="text-xs " />
        Go Back
      </button>
      <h1 className="text-3xl font-bold text-blue-700 mb-4 md:text-left text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.productTitle}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.productTitle}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ${Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Decrease Quantity */}
                {item.quantity > 1 && (
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="text-yellow-600 cursor-pointer hover:text-yellow-800 transition text-sm font-medium border border-yellow-600 px-2 py-1 rounded"
                    title="Decrease Quantity"
                  >
                    −
                  </button>
                )}

                {/* Increase Quantity */}
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="text-green-600 cursor-pointer hover:text-green-800 transition text-sm font-medium border border-green-600 px-2 py-1 rounded"
                  title="Increase Quantity"
                >
                  +
                </button>

                {/* Remove Item */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 cursor-pointer hover:text-red-800 transition"
                  title="Remove All"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="flex justify-between items-center mt-8 border-t pt-4">
            <div className="text-lg font-medium text-gray-700">
              Total Items:{" "}
              <span className="text-blue-600 font-bold">{totalQuantity}</span>
            </div>
            <div className="text-lg font-medium text-gray-700">
              Total Price:{" "}
              <span className="text-blue-600 font-bold">${totalPrice}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
