import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserOrder } from "../../redux/orderSlice";
import { Link } from "react-router-dom";

const OrderDetails = ({ order }) => {
  // Destructuring order object
  const {
    _id,
    orderedItems,
    orderStatus,
    orderedTime,
    paymentMethod,
    shippingInfo,
    totalPrice,
  } = order;

  return (
    <div className="bg-slate-400 my-5 md:w-[90%] mx-2 rounded-lg shadow-xl container p-4 flex flex-col gap-4 md:flex-row md:items-center">
      {/* Left section containing order details */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <h2 className="text-xl font-medium">Order #{_id.substring(0, 7)}</h2>
        <p className="text-gray-700">Ordered at: {orderedTime}</p>
        <p className="text-gray-700">Status: {orderStatus}</p>
        <p className="text-gray-700">Payment Method: {paymentMethod}</p>
        <p className="text-gray-700">
          Shipping Address: {shippingInfo.address}, {shippingInfo.city},{" "}
          {shippingInfo.state} {shippingInfo.pinCode}
        </p>
      </div>
      {/* Right section containing ordered items */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h3 className="text-xl font-medium">Items Ordered</h3>
        {/* Mapping over ordered items */}
        {orderedItems.map((item) => (
          <div key={item._id} className="flex items-center gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="text-left">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-700">Qty: {item.qty}</p>
              <p className="text-gray-700">Price: &#8377;{item.price}</p>
            </div>
          </div>
        ))}
        {/* Displaying total price */}
        <p className="text-right font-medium">
          Total Price: &#8377;{totalPrice}
        </p>
        {/* Link to order details page */}
        <Link
          to={`/order-details/${_id}`}
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Order Details
        </Link>
      </div>
    </div>
  );
};

const AllOrders = () => {
  // Redux hooks for dispatch and selector
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);

  // Fetching user orders on component mount
  useEffect(() => {
    dispatch(getLoggedUserOrder());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto py-3  flex justify-center items-center flex-col">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      {/* Mapping over user orders and rendering OrderDetails component */}
      {myOrders?.order?.order?.map((order) => (
        <OrderDetails key={order._id} order={order} />
      ))}
    </div>
  );
};

export default AllOrders;
