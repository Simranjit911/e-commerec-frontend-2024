import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../redux/cartSlice";
import { useDispatch } from "react-redux";

function SuccessPage() {
  const dispatch = useDispatch();
  // const { productOrderData, setProductOrderData } = useContext(DarkModeContext);
  // console.log(productOrderData);

  // useEffect(() => {
  //   // Check if productOrderData exists before dispatching
  //   if (productOrderData) {
  //     dispatch(createOrder(productOrderData));
  //   }
  // }, []); // Empty dependency array ensures useEffect runs only once
  useEffect(() => {
    localStorage.removeItem("cart");
    saveCartToLocalStorage([]);
    loadCartFromLocalStorage(dispatch);
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
