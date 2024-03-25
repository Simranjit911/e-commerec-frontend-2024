import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../redux/orderSlice";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import axios from "../axiosConfig";

// import { createOrder } from "../redux/orderSlice"; // Assuming you have an order slice with an action to create an order

function CheckoutPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  let nav = useNavigate();
  async function makePayment() {
    try {
      const key = import.meta.env.VITE_REACT_APP_STRIPE_PK;
      const stripe = await loadStripe(key);
      const res = await axios.post("/order/payment", cart);
      const session = await res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        throw new Error(result.error.message);
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const [shippingInfo, setShippingInfo] = useState({
    address: "1",
    city: "1",
    state: "1",
    country: "1",
    pinCode: "1",
    phoneNo: "111111111",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Function to handle payment method selection
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
  };
  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const total = subtotal;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.country ||
      !shippingInfo.pinCode ||
      !shippingInfo.phoneNo
    ) {
      return toast.error("Please fill out all shipping information ");
    }
    if (selectedPaymentMethod === "") {
      return toast.error("Select Payment Method");
    }
    if (cart.length <= 0) {
      return toast.error("😅 Your Cart is Empty");
    }

    // Create order object
    const orderData = {
      user: user?._id,
      totalPrice: total,
      shippingInfo,
      orderedItems: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.images[0].url,
      })),
      userDetails: {
        user: user?._id,
        name: user?.name,
      },
      paymentMethod: selectedPaymentMethod,
      itemPrice: cart.reduce((total, item) => total + item.price * item.qty, 0),
    };

    if (selectedPaymentMethod === "Card") {
      makePayment();
    } else {
      dispatch(createOrder(orderData));
      setTimeout(() => {
        nav("/success");
      }, 1500);
    }
  };

  return (
    <div className="md:px-[20%] mx-auto  py-8 px-[5%] ">
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
            <div className="capitalize">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
              <p className="text-sm text-gray-500">
                Sub Total: ₹{item.price * item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Address section */}
      <form onSubmit={handlePlaceOrder} className="mt-8">
        <p className="text-lg font-semibold mb-2">Shipping Information</p>
        {/* Add form fields for shipping information */}
        <input
          required
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          required
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, city: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          required
          type="text"
          placeholder="State"
          value={shippingInfo.state}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, state: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          required
          type="text"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, country: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          required
          type="number"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, pinCode: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          required
          type="tel"
          minLength={10}
          maxLength={10}
          placeholder="Phone Number"
          value={shippingInfo.phoneNo}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, phoneNo: e.target.value })
          }
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        {/* Payment method selection */}
        <div className="mt-8">
          <p className="text-lg font-semibold mb-2">Payment Method</p>
          {/* Add buttons for payment methods */}
          <button
            onClick={() => handlePaymentMethodSelection("Cash on delivery")}
            className={`mr-4 ${
              selectedPaymentMethod === "Cash on delivery"
                ? "bg-blue-900"
                : "bg-blue-400"
            } px-2 py-2 bg-blue-400 text-white hover:scale-105 duration-150 shadow-xl w-fit `}
            type="button"
          >
            Cash on Delivery
          </button>
          <button
            type="button"
            onClick={() => handlePaymentMethodSelection("Card")}
            className={`${
              selectedPaymentMethod === "Card" ? "bg-blue-900" : "bg-blue-400"
            } px-2 py-2 bg-blue-400 text-white hover:scale-105 duration-150 shadow-xl w-fit`}
          >
            Card
          </button>
        </div>
        {/* Subtotal and Total */}
        <div className="mt-8">
          <p className="text-lg font-semibold mb-2">Order Summary</p>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">₹{total}</p>
          </div>
        </div>

        {/* Order completion */}
        <div className="mt-8">
          <button
            type="submit"
            // onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-4 py-2 shadow-xl hover:bg-blue-800"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
