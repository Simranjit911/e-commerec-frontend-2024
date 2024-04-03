import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleOrder } from "../../redux/orderSlice";
import Loader from "../Loader";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.order);
  const { order: od, isLoading, isError } = singleOrder;
  const order = od ? od.order : null; // Add null check here
  let nav = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="my-48">
        <Loader span={"Loading Order"} />
      </div>
    );
  }
  if (isError)
    return <div className="p-4 text-red-600">Error fetching order details</div>;
  if (!order) return null;

  const {
    shippingInfo,
    userDetails: { name },
    orderedItems,
    orderStatus,
    orderedTime,
    paymentMethod,
    isPaid,
    totalPrice,
    createdAt,
  } = order;
  console.log(order);
  // Define order stages
  const orderStages = ["Not Processed", "Packed", "Shipped", "Delivered"];
  const orderTrackingStages = [
    "Not Processed",
    "Packed",
    "Shipped",
    "Delivered",
  ];
  // Get the index of the current order status
  const currentStageIndex = orderStages.findIndex(
    (stage) => stage.toLowerCase() == orderStatus.toLowerCase()
  );

  return (
    <div className="md:px-[20%] px-[10%] bg-gray-100 mx-auto p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6  text-gray-800">
        Order Details{" "}
        <span className="text-green-700">
          {" "}
          (Order No. #{id.substring(0, 7)})
        </span>
      </h1>
      {/* Order Overview */}
      <div className="bg-blue-200 rounded-lg shadow-md p-4 capitalize mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Shipping Information
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Shipping Address:</span>{" "}
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
              {shippingInfo.pinCode} {shippingInfo.country}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p className="text-gray-700 lowercase">
              <span className="font-semibold capitalize ">Email:</span>{" "}
              {user?.email.toLowerCase()}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Order Information
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Order Status:</span> {orderStatus}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Order Time:</span>{" "}
              {new Date(createdAt).toLocaleString("en-US")}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Payment Method:</span>{" "}
              {paymentMethod}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Payment Status:</span>{" "}
              {isPaid == "yes" ? "Paid" : "Not Paid"}
            </p>
          </div>
        </div>
      </div>
      {/* Order Tracking */}
      <div className="mt-8 my-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Order Tracking
        </h2>
        <div className="flex justify-between items-center">
          {orderTrackingStages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  currentStageIndex >= index ? "bg-blue-900" : "bg-blue-300"
                }`}
              >
                <span className="text-xs font-semibold text-white">
                  {index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800">{stage}</p>
              {/* <div
                className={`h-1 w-10   bg-gray-500 ${
                  currentStageIndex >= index ? "bg-blue-800" : "bg-gray-500"
                }`}
              ></div> */}
            </div>
          ))}
        </div>
      </div>

      {/* order items */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Ordered Items
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderedItems.map((item) => (
          <Link
            to={`/product/${item.productId}`}
            key={item._id}
            className="flex items-center p-4 border rounded-lg shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4">
              <p className="font-semibold text-gray-800 capitalize">
                {item.name}
              </p>
              <p className="text-gray-700">Qty: {item.qty}</p>
              <p className="text-gray-700">Price: ₹{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* price  */}
      <div className="flex justify-between items-center border-t-2 border-gray-800 pt-4 mt-4">
        <p className="text-gray-700 font-bold text-xl">
          Total Price: ₹{totalPrice}
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
