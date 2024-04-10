import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageSlider from "../components/ImageSlider";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import TopDeals from "../components/TopDeals";
import { fetchProducts, fetchSingleProduct } from "../redux/productSlice";
import { checkAuth } from "../redux/userSlice";
import RecommendedProd from "../components/RecommendedProd";
import { loadCartFromLocalStorage } from "../redux/cartSlice";
// import { getCartData } from "../redux/cartSlice";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getLoggedUserOrder } from "../redux/orderSlice";
import AllProducts from "./AllProducts";
function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getLoggedUserOrder());
  }, []);
  let { user, isAuthenticated } = useSelector((state) => state.user);
  let nav = useNavigate();
  return (
    <div className="w-full  h-full text-white">
      <ImageSlider />
      <div className=" max-w-[1220px] mx-auto">
      <Services />
      <TopDeals />
        <LatestProducts />
        <div className="mx auto flex md:hidden justify-center items-center my-8">
          <Button
            text={"Explore More Products"}
            fn={() => nav("/allproducts")}
            classes={"mx auto flex justify-center items-center"}
          />
        </div>
        <RecommendedProd />
        <div className="mx auto flex md:hidden justify-center items-center my-8">
          <Button
            text={"Explore More Products"}
            fn={() => nav("/allproducts")}
            classes={"mx auto flex justify-center items-center"}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
