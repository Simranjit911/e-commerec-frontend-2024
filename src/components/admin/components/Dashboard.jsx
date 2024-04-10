import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/adminSlice";
import User from "./User";
import { fetchProducts, fetchProductswithQuery } from "../../../redux/productSlice";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getAllOrders } from "../../../redux/orderSlice";
import Loader from "../../Loader";

function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { allOrders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  let [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {

    dispatch(fetchAllUsers());
    dispatch(getAllOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  useLayoutEffect(() => {
    setInStockCount(products?.totalProducts - products?.outOfStockCount);
    setOutOfStockCount(products?.outOfStockCount);
    setOrderStatus(allOrders?.order?.orderStatusCounts);
  }, [products?.totalProducts, outOfStockCount]);



  const orderData = [
    {
      name: "Not Processed",
      value:
        orderStatus?.find((ele) => ele._id === "not processed")?.count || 0,
    },
    {
      name: "Packed",
      value: orderStatus?.find((ele) => ele._id === "packed")?.count || 0,
    },
    {
      name: "Delivered",
      value: orderStatus?.find((ele) => ele._id === "delivered")?.count || 0,
    },
    {
      name: "Shipped",
      value: orderStatus?.find((ele) => ele._id === "shipped")?.count || 0,
    },
  ];

  const productAvailabilityData = [
    { name: "In Stock", value: inStockCount },
    { name: "Out of Stock", value: outOfStockCount },
  ];

  const colors = ["#3182CE", "#A0AEC0", "#FC8181", "#68D391"];
  const colors2 = [...colors];
  colors2.reverse();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white px-6 py-7">
      <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>

      {/* Total Users, Total Products, Total Orders section */}
      <div className="flex gap-6 flex-col md:flex-row my-5">
        <div className="flex flex-col items-center px-10 justify-center p-4 bg-slate-600 rounded-lg">
          <p className="text-2xl font-semibold">Total Users</p>
          <p className="text-3xl font-bold">
            {users?.data?.allUsers?.length || 0}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-600 rounded-lg">
          <p className="text-2xl font-semibold">Total Products</p>
          <p className="text-3xl font-bold">{products?.totalProducts || 0}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-600 rounded-lg">
          <p className="text-2xl font-semibold">Total Orders</p>
          <p className="text-3xl font-bold">{allOrders?.order?.total || 0}</p>
        </div>
      </div>

      <div className="duration-500 transition-all flex w-full gap-10 justify-center items-center flex-col lg:flex-row my-5">
        {/* Products Availability section */}
        <div className="w-full max-w-lg px-6">
          <h2 className="text-2xl font-semibold mb-4 text-center bg-blue-600 py-2 rounded-lg">
            Products Availability
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={productAvailabilityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={window.innerWidth > 768 ? 160 : 80}
                label
              >
                {productAvailabilityData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full mx-auto flex justify-center items-center gap-5">
            <p className="bg-[#3182CE] px-1 py-0.5 rounded text-black text-md">
              In Stock: {inStockCount}
            </p>
            <p className="bg-[#A0AEC0] px-1 py-0.5 rounded text-black text-md">
              Out of Stock: {outOfStockCount}
            </p>
          </div>
        </div>

        {/* Orders Status section */}
        {allOrders?.order?.msg != "All orders found!" ? (
          <Loader span={"Loading Orders"} />
        ) : (
          <div className="w-full max-w-lg px-6">
            <h2 className="text-2xl font-semibold mb-4 text-center py-2 bg-blue-600 rounded-lg">
              Orders Status
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={orderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={window.innerWidth > 768 ? 160 : 80}
                  label
                >
                  {orderData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors2[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mx-auto flex justify-center items-center gap-5">
              <p className="bg-[#68D391] px-1 py-0.5 rounded text-black text-md">
                Not Processed: {orderData[0].value}
              </p>
              <p className="bg-[#FC8181] px-1 py-0.5 rounded text-black text-md">
                Packed: {orderData[1].value}
              </p>
              <p className="bg-[#A0AEC0] px-1 py-0.5 rounded text-black text-md">
                Delivered: {orderData[2].value}
              </p>
              <p className="bg-[#3182CE] px-1 py-0.5 rounded text-black text-md">
                Shipped: {orderData[3].value}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* users */}
      <div
        className="w-full max-h-[300px] my-8 overflow-y-auto"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "blue",
        }}
      >
        <User />
      </div>
    </div>
  );
}

export default Dashboard;
