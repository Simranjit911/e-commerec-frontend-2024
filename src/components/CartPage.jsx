import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decQty, deleteFromCart, incQty } from "../redux/cartSlice";
import Button from "./Button";
import { CiCircleRemove } from "react-icons/ci";

function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Calculate total price of all products in the cart
    let total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    setCartTotal(total);
  }, [cart]);

  const handleIncreaseQty = (id) => {
    dispatch(incQty(id));
  };

  const handleDecreaseQty = (prod) => {
    // Dispatch action to decrease quantity
    dispatch(decQty(prod));
  };

  const handleRemoveItem = (id) => {
    // Dispatch action to remove item from cart
    dispatch(deleteFromCart(id));
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[400px]">
      {cart?.length < 1 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="md:px-[15%] min-h-[500px]">
          <h2 className="container text-xl font-semibold mb-4">
            Your Shopping Cart
          </h2>
          <div className="overflow-x-auto container ">
            <table className="w-full table-auto shadow-md rounded-lg">
              <thead className="border border-blue-400">
                <tr>
                  <th className="px-1 py-1"></th>
                  <th className="px-4 py-2 text-sm md:text-md text-left">
                    Product Name
                  </th>
                  <th className="px-4  py-2 text-center">Price</th>
                  <th className="px-4 py-2 text-center">Qty</th>
                  <th className="px-4 py-2 text-center">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-2 py-2 text-center">
                      <button
                        className="text-red-500 text-3xl hover:scale-110 duration-150 ease-linear hover:text-red-700 "
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <CiCircleRemove />
                      </button>
                    </td>
                    <td className="px-4 py-2 flex min-w-48 items-center">
                      <img
                        src={item.images.length > 0 ? item.images[0].url : ""}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-sm shadow-xl mr-4"
                      />
                      <div>
                        <p className="md:text-lg text-sm font-semibold capitalize">
                          {item.name}
                        </p>
                        <p className="text-xs text-blue-500 capitalize">
                          {item.category}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">₹{item.price}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center items-center">
                        <Button
                          text={"-"}
                          classes={"bg-gray-500 px-3 py-1 text-lg rounded-l"}
                          fn={() => handleDecreaseQty(item)}
                        />
                        <span className="px-4">{item.qty}</span>
                        <Button
                          text={"+"}
                          classes={"bg-gray-500 px-3 py-1 text-lg rounded-r"}
                          fn={() => handleIncreaseQty(item)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      ₹{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-end">
            <div>
              <p className="font-semibold text-slate-800">
                Cart Total: ₹{cartTotal}
              </p>
              <Link to="/checkout">
                <Button
                  classes="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600"
                  text={"Proceed to Checkout"}
                ></Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
