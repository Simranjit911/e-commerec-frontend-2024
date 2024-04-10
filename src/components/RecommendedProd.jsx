import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
import Loader from "./Loader.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

function RecommendedProd() {
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  let nav=useNavigate()
  const [recom, setRecom] = useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: "",
    desc: "",
    rating: "",
    category: "",
    isRecom: "true",
    isLatest: "",
    price: "",
    resultsPerPage: 10,
    page: 1,
  });
  const q = new URLSearchParams(filters).toString();

  useEffect(() => {
    dispatch(fetchProductswithQuery(q));
  }, [dispatch, q]);

  useEffect(() => {
    if (products) {
      setRecom(products);
    }
  }, [products]);

  return (
    <div>
      <div className="text-black text-center  my-1 py-2 px-2 md:px-0">
        
      <div className="flex justify-between md:px-8 items-center">
          <p className="py-2  font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-blue-600">
            Recommended Products
          </p>
          <div className="mx auto md:flex justify-center items-center hidden">
            <Button
              text={"Explore More Products"}
              fn={() => nav("/allproducts")}
              classes={"mx auto flex justify-center items-center"}
            />
          </div>
        </div>
        <div className="grid xs:grid-cols-1 grid-cols-2  justify-center items-center col-auto px-auto   gap-5 md:flex md:flex-wrap md:gap-7 md:my-5 md:items-center md:justify-center">
          {isLoading &&  <div className="col-span-2 flex justify-center items-center mx-auto">
          <Loader span={"Loading Latest Products"} />
        </div>}
          {isError && <div>Error in Fetching Products</div>}
          {!isLoading &&
            !isError &&
            products?.products?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedProd;
