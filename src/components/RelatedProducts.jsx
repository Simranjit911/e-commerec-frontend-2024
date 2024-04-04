import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductswithQuery } from "../redux/productSlice";
import Product from "./Product";
import Loader from "./Loader";

function RelatedProducts({ category, id }) {
  let filter = {
    category: category,
  };
  const queryParams = new URLSearchParams(filter).toString();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductswithQuery(queryParams));
  }, []);
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );
  const [filteredProd, setFilteredProd] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products?.products?.filter(
        (prod) => prod._id !== id
      );
      setFilteredProd(filteredProducts?.slice(0, 4));
    }
  }, [products, id]);

  return (
    <>
      {isLoading && (
        <div className="my-6 mx-auto">
          <Loader span={"Loading "} />
        </div>
      )}
      {!isLoading && !isError && products?.products?.length > 1 && (
        <div className="">
          <p className="  mt-6 md:ml-32 font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-sky-600">
            Related Products
          </p>
          <div className="flex px-4 gap-5 py-4 flex-wrap justify-center md:overflow-x-auto  ">
            {filteredProd?.map((prod, i) => (
              <Product product={prod} key={i} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedProducts;
