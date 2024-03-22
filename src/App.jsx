import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AllProducts from "./pages/AllProducts";
import AdminCheck from "./components/admin/AdminCheck";
import AdminPanel from "./components/admin/AdminPanel";
import ProductUpdate from "./pages/ProductUpdate";
import CartPage from "./components/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetails from "./components/order/OrderDetails";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/cart" element={<CartPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
        </Route>
        <Route element={<AdminCheck />}>
          <Route path={"/admin"} element={<AdminPanel />} />
          <Route path="/admin/product/update/:id" element={<ProductUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
