import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../redux/productSlice";
import Loader from "../components/Loader";
import ReactStars from "react-rating-stars-component";
import { FaCartArrowDown } from "react-icons/fa";
import Button from "../components/Button";
import Reviews from "../components/Reviews";

function ProductDetails() {
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);
  const { singleProduct } = useSelector((state) => state.products);
  let { product } = singleProduct;
  console.log(singleProduct);
  let options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 20,
    value: product?.rating,
    activeColor: "salmon",
    isHalf: true,
  };

  return (
    <>
      {singleProduct.isLoading == true ? (
        <Loader />
      ) : (
        <>
          <p className="px-8 py-8">Product Details</p>
          <div className="w-full h-fit flex px-8 py-8 bg-gray-300 ">
            {/* left div */}
            <div className="mx-auto w-[40%] px-1 py-1">
              {product && (
                <img
                  src={product?.images?.[0]?.url}
                  alt=""
                  className="md:w-[100%] md:float-right shadow-sm object-contain h-full max-h-[500px] "
                />
              )}
            </div>

            {/* right div */}
            <div className="md:w-[60%] px-6 items-left justify-around flex flex-col py-2 ">
              {/* top */}
              <div className="flex flex-col gap-1">
                {/* category */}
                <p className="uppercase text-xs text-gray-600">
                  {product?.category}
                </p>
                {/* title */}
                <p className="text-2xl font-semibold text-slate-800 capitalize">
                  {product?.name}
                </p>
                {/* Ratings */}
                <span className="flex gap-2">
                  <div className="flex">
                    {product?.rating && <ReactStars {...options} />}
                    {product?.rating && `(${product.rating})`}
                  </div>
                  <p className="text-sm text-gray-500">
                    ({product?.numOfReviews}) Reviews
                  </p>
                </span>
              </div>
              {/* middle */}
              <div className="flex justify-left items-center gap-1 ">
                {/* price */}
                <p className="uppercase text-3xl text-blue-600">
                  ₹{product.price}
                </p>
                {/* added price */}
                <p className="text-lg line-through text-slate-600 ">
                  ₹{(product.price * 1.5).toFixed(2)}
                </p>
              </div>
              {/* stock */}
              <p className="flex items-center">
                <span className="uppercase text-gray-800"> </span>
                <span className={`bg-green-500 text-white px-1 py-0.5`}>
                  In Stock
                </span>{" "}
              </p>
              {/* desc */}
              <p className="md:text-xl font-normal font-serif my-1">
                {product.desc}
              </p>
              {/* bottom */}
              <div className="flex gap-5">
                {/* qty btn */}
                <div className="flex gap-3 justify-center items-center">
                  <Button
                    text={"+"}
                    classes={"bg-gray-500 md:px-3 md:py-1 md:text-xl"}
                  />
                  <p className="md:text-xl">1</p>
                  <Button
                    text={"-"}
                    classes={"bg-gray-500 md:px-3 md:py-1 md:text-xl"}
                  />
                </div>
                {/* cart btn  */}
                <Button
                  text={`Add to Cart `}
                  icon={<FaCartArrowDown />}
                  classes={"md:px-2 md:py-1 md:text-lg gap-1"}
                />
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="w-full h-full mx-auto my-4 py-4">
            <p className="text-center text-2xl font-semibold">User Reviews</p>
            <Reviews />
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
