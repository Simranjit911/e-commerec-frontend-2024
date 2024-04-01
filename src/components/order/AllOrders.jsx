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
    <div className="bg-gray-100 container max-w-screen-lg rounded-lg p-4 shadow-xl w-full md:w-[80%] mx-auto my-5 md:flex md:items-center capitalize gap-4">
      {/* Left section containing order details */}
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-1/2 capitalize mb-3">
        <h2 className="text-xl font-semibold text-green-700">
          Order No. #{_id.substring(0, 9)}
        </h2>
        <p className="text-gray-700 ">
          <span className="font-semibold">Ordered at:</span> {orderedTime}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Status:</span> {orderStatus}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Payment Method:</span> {paymentMethod}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Shipping Address:</span>{" "}
          {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}{" "}
          {shippingInfo.pinCode}
        </p>
      </div>
      {/* Right section containing ordered items */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <h3 className="text-xl font-medium">Items Ordered</h3>
        {/* Mapping over ordered items */}
        {orderedItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col">
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
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
    <div className="w-full max-w-screen-lg min-h-[500px]  mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {/* Mapping over user orders and rendering OrderDetails component */}
      {myOrders?.order?.order?.length > 0 ? (
        myOrders?.order?.order?.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))
      ) : (
        <div className="text-center">You Have Not Ordered anyrhing yet</div>
      )}
    </div>
  );
};

export default AllOrders;
