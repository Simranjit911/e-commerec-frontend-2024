import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageSlider from "../components/ImageSlider";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import TopDeals from "../components/TopDeals";
import { fetchProducts, fetchSingleProduct } from "../redux/productSlice";
import { checkAuth } from "../redux/userSlice";

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  let {user,isAuthenticated}=useSelector(state=>state.user)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch,isAuthenticated,user]);

  return (
    <div className="w-full h-full text-white ">
      <ImageSlider />
      <Services />
      <TopDeals />
      <LatestProducts />
    </div>
  );
}

export default Home;
