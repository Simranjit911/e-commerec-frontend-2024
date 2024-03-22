import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/orderSlice";
import Loader from "../Loader";

function Orders() {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);
  const { isLoading, isError, order } = allOrders;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className=" mx-auto p-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
        <p className="bg-blue-500 w-fit text-white  px-2 py-1 shadow-xl my-1 rounded">
          Total Orders:{order?.orders?.length}
        </p>
      </div>
      {isLoading && <Loader />}
      {isError && <p>Error fetching orders</p>}
      {order && (
        <table className="w-full    mx-auto text-center bottom-2 shadow-2xl text-sm">
          <thead>
            <tr className="border-2 text-black  border-gray-500 bg-slate-400 ">
              <th className="border px-1 border-gray-600">Sr.No.</th>
              <th className="border px-1 border-gray-600">Order ID</th>
              <th className="border px-1 border-gray-600">Order Status</th>
              <th className="border px-1 border-gray-600">Ordered Time</th>
              <th className="border px-1 border-gray-600">Payment Method</th>
              <th className="border px-1 border-gray-600">Is Paid</th>
              <th className="border px-1 border-gray-600">Total Price</th>
              <th className="border px-1 border-gray-600">Image</th>
            </tr>
          </thead>
          <tbody>
            {order?.orders?.map((orderItem, i) => (
              <tr
                key={orderItem._id}
                className="text-center border border-slate-500 cursor-pointer hover:scale-100 shadow-2xl duration-100 bg-sky-150 hover:bg-slate-500"
              >
                <td className="  mx-auto py-1">{i + 1}</td>
                <td className="  mx-auto py-1">
                  #{orderItem._id.substring(0, 7)}
                </td>
                <td className="  mx-auto py-1">{orderItem.orderStatus}</td>
                <td className="  mx-auto py-1">{orderItem.orderedTime}</td>
                <td className="  mx-auto py-1">{orderItem.paymentMethod}</td>
                <td className="  mx-auto py-1">{orderItem.isPaid}</td>
                <td className="  mx-auto py-1">
                  &#8377;{orderItem.totalPrice}
                </td>
                <td className="  mx-auto py-1">
                  <img
                    src={orderItem.orderedItems[0].image}
                    alt="Product"
                    className="w[10%] mx-auto rounded-xl h-14"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
