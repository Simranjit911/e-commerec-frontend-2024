import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/orderSlice";
// import { createOrder } from "../redux/orderSlice"; // Assuming you have an order slice with an action to create an order

function CheckoutPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [shippingInfo, setShippingInfo] = useState({
    address: "sample",
    city: "jal",
    state: "pb",
    country: "in",
    pinCode: "14",
    phoneNo: "15",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  // Function to handle payment method selection
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
  };
 // Calculate subtotal
 const subtotal = cart.reduce(
  (total, item) => total + item.price * item.qty,
  0
);

// Calculate total (subtotal + shipping + tax)
const total = subtotal; // Add shipping and tax calculations here
  // Function to handle order placement
  const handlePlaceOrder = () => {
    // Create order object
    const orderData = {
      user: user._id,
      totalPrice:total,
      shippingInfo,
      orderedItems: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.images[0].url,
      })),
      userDetails: {
        user: user._id,
        name: user.name,
      },
      paymentMethod: selectedPaymentMethod,
      itemPrice: cart.reduce((total, item) => total + item.price * item.qty, 0),
      // Add logic to calculate other prices (shipping, tax, total) based on your requirements
    };
    console.log("order", orderData);

    // Dispatch action to create order
    dispatch(createOrder(orderData));

    // Clear cart after placing order (optional)
    // dispatch({ type: "CLEAR_CART" });
  };

 

  return (
    <div className="container mx-auto px-4 py-8 lg:px-10 ">
      <p className="text-3xl font-semibold mb-4">Checkout</p>

      {/* Display cart items */}
      <div className="bg-blue-300 px-3 py-3 rounded-xl shadow-xl">
        <p className="text-lg font-semibold mb-2">Cart Items:</p>
        {/* Render cart items here */}
        {cart.map((item) => (
          <div key={item._id} className="flex items-center mb-4">
            {/* Display item details */}
            <img
              src={item.images[0].url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Address section */}
      <div className="mt-8">
        <p className="text-lg font-semibold mb-2">Shipping Information</p>
        {/* Add form fields for shipping information */}
        <input
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, city: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="State"
          value={shippingInfo.state}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, state: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, country: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, pinCode: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={shippingInfo.phoneNo}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, phoneNo: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        {/* Add other address fields as needed */}
      </div>

      {/* Payment method selection */}
      <div className="mt-8">
        <p className="text-lg font-semibold mb-2">Payment Method</p>
        {/* Add buttons for payment methods */}
        <button
          onClick={() => handlePaymentMethodSelection("Cash on delivery")}
          className={`mr-4 ${
            selectedPaymentMethod === "Cash on delivery" ? "bg-blue-900" : ""
          } px-2 py-2 bg-blue-600 text-white hover:scale-105 duration-150 shadow-xl `}
        >
          Cash on Delivery
        </button>
        <button
          onClick={() => handlePaymentMethodSelection("Card")}
          className={`${
            selectedPaymentMethod === "Card" ? "bg-blue-900" : ""
          } px-2 py-2 bg-blue-500 text-white hover:scale-105 duration-150 shadow-xl`}
        >
          Card
        </button>
      </div>
      {/* Subtotal and Total */}
      <div className="mt-8">
        <p className="text-lg font-semibold mb-2">Order Summary</p>
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p>${subtotal}</p>
        </div>
        {/* Add shipping and tax */}
        {/* <div className="flex justify-between mb-2">
          <p>Shipping:</p>
          <p>$0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tax:</p>
          <p>$0</p>
        </div> */}
        <div className="flex justify-between mb-2">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-semibold">${total}</p>
        </div>
      </div>

      {/* Order completion */}
      <div className="mt-8">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
