import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { DarkModeContext } from "../context/DarkModeContext";
import { createOrder, getLoggedUserOrder } from "../redux/orderSlice";

function SuccessPage() {
  const dispatch = useDispatch();
  let { orderData: od } = useContext(DarkModeContext);
  useEffect(() => {
    let order = {};
    const orderData = localStorage.getItem("orderData");
    order = orderData ? JSON.parse(orderData) : {};
    if (order?.orderedItems?.length >= 1) {
      dispatch(createOrder(order));
      localStorage.removeItem("cart");
      localStorage.removeItem("orderData");
      saveCartToLocalStorage([]);
      loadCartFromLocalStorage(dispatch);
      dispatch(getLoggedUserOrder());
    } else {
      // let order = {};
      // const orderData = localStorage.getItem("orderData");
      // order = orderData.orderData ? JSON.parse(orderData) : {};
      // console.log(order);
      // if (order != null || order != undefined) {
      //   console.log("2");
      //   // dispatch(createOrder(order.orderData));
      // }
    }
  }, []);

  return (
    <div className="bg-green-100 min-h-screen flex justify-center items-center">
      <div className="bg-green-200 p-8 rounded shadow-2xl text-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          Order Successful
        </h2>
        <p className="text-gray-700 mb-8">Thank you for your purchase!</p>
        <Link
          to={"/profile"}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Go to your Profile
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
