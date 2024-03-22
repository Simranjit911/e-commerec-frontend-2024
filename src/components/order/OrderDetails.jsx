import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../redux/orderSlice";
import Loader from "../Loader";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.order);
  const { order: od, isLoading, isError } = singleOrder;
  const { order } = od;

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (isError) return <div className="p-4">Error fetching order details</div>;
  if (!order) return null;

  const {
    shippingInfo,
    userDetails: { name },
    orderedItems,
    orderStatus,
    orderedTime,
    paymentMethod,
    isPaid,
    itemPrice,
    shippingPrice,
    totalPrice,
  } = order;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        <span className="font-bold">Order Details</span> (Order #{id.substring(0, 7)})
      </h1>

      <div className="bg-white rounded-lg shadow-md md:flex py-2">
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-2xl font-semibold mb-3">
            <span className="font-bold">Shipping Information</span>
          </h2>
          <p className="text-gray-700 capitalize">
            <span className="font-medium text-slate-700 text-xl">
              Shipping Address:
            </span>{" "}
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
            {shippingInfo.pinCode} {shippingInfo.country}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-slate-700 text-xl">
              Customer Name:
            </span>{" "}
            {name}
          </p>
        </div>
        <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold mb-2">
            <span className="font-bold">Order Information</span>
          </h2>
          <p className="text-gray-700">
            <span className="font-medium text-slate-700 text-xl">Order Status:</span>{" "}
            {orderStatus}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-slate-700 text-xl">Ordered Time:</span>{" "}
            {orderedTime}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-slate-700 text-xl">Payment Method</span>{" "}
            : {paymentMethod}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-slate-700 text-xl">Payment Status:</span>{" "}
            {isPaid ? "Paid" : "Not Paid"}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-medium mt-6">
        <span className="font-bold">Ordered Items</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {orderedItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center p-4 border rounded-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4">
              <p className="font-bold text-gray-800">{item.name}</p>
              <p className="text-gray-700">Qty: {item.qty}</p>
              <p className="text-gray-700">Price: &#8377;{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 px-4">
        <p className="text-gray-700">Item Price: &#8377;{itemPrice}</p>
        <p className="text-gray-700">Shipping Price: &#8377;{shippingPrice}</p>
        <p className="text-gray-700 font-bold">
          Total Price: &#8377;{totalPrice}
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
