import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../redux/orderSlice";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

function Orders() {
  let nav = useNavigate();
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);
  const { isLoading, isError, order } = allOrders;

  const handleUpdateOrder = (orderId, status) => {
    dispatch(updateOrder({ orderId, status }));
    setTimeout(() => {
      dispatch(getAllOrders());
    }, 1200);
  };
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div className=" mx-auto p-4 bg-gray-800 h-full text-white md:min-h-[600px]">
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
              <th className="border px-1 border-gray-600">Image</th>

              <th className="border px-1 border-gray-600">Order ID</th>
              <th className="border px-1 border-gray-600">Order Status</th>
              <th className="border px-1 border-gray-600">Ordered Time</th>
              <th className="border px-1 border-gray-600">Payment Method</th>
              <th className="border px-1 border-gray-600">Is Paid</th>
              <th className="border px-1 border-gray-600">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.orders?.map((orderItem, i) => (
              <tr
                key={orderItem._id}
                className="text-center border border-slate-500 cursor-pointer hover:scale-100 shadow-2xl duration-100 bg-sky-150 hover:bg-slate-500"
              >
                <td className="  mx-auto py-1">{i + 1}</td>
                <td
                  className="mx-auto py-1"
                  onClick={() => nav(`/order-details/${orderItem._id}`)}
                >
                  <div title="See order details">
                    <img
                      src={orderItem?.orderedItems[0]?.image}
                      alt="Product"
                      className="w[5%] mx-auto rounded-xl h-14 hover:scale-105"
                    />
                  </div>
                </td>
                <td className="  mx-auto py-1">
                  #{orderItem._id.substring(0, 7)}
                </td>
                <td className="mx-auto py-1" title="Update Order Status">
                  <select
                    className={` ${
                      orderItem.orderStatus == "packed"
                        ? "bg-[#FC8181] text-black"
                        : ""
                    }
                    
                    ${
                      orderItem.orderStatus == "delivered"
                        ? "bg-[#A0AEC0] text-black"
                        : ""
                    }
                    ${
                      orderItem.orderStatus == "shipped"
                        ? "bg-[#3182ce] text-black"
                        : ""
                    }bg-[#68D391] text-black
                    `}
                    onChange={(e) =>
                      handleUpdateOrder(orderItem._id, e.target.value)
                    }
                    value={orderItem.orderStatus} // Set the value to the orderStatus from backend
                  >
                    <option value="not processed" className="bg-[#68D391]">
                      Not Processed
                    </option>
                    <option className="bg-[#FC8181]" value="packed">
                      Packed
                    </option>
                    <option className="bg-[#3182CE]" value="shipped">
                      Shipped
                    </option>
                    <option className="bg-[#A0AEC0]" value="delivered">
                      Delivered
                    </option>
                  </select>
                </td>

                <td className="  mx-auto py-1">{orderItem.orderedTime}</td>
                <td className="  mx-auto py-1">
                  {orderItem.paymentMethod == "Cash on delivery"
                    ? "COD"
                    : "Card"}
                </td>
                <td className="  mx-auto py-1 capitalize">
                  {orderItem.isPaid}
                </td>
                <td className="  mx-auto py-1">
                  &#8377;{orderItem.totalPrice}
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
