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

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  let { user, isAuthenticated } = useSelector((state) => state.user);



  return (
    <div className="w-full h-full text-white ">
      <ImageSlider />
      <Services />
      <TopDeals />
      <LatestProducts />
      <RecommendedProd />
    </div>
  );
}

export default Home;
