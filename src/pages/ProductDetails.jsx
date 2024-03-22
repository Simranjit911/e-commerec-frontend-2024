import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../redux/productSlice";
import Loader from "../components/Loader";
import ReactStars from "react-rating-stars-component";
import { FaCartArrowDown } from "react-icons/fa";
import Button from "../components/Button";
import Reviews from "../components/Reviews";
import { addToCart } from "../redux/cartSlice";

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
    activeColor: "#3182CE", // Blue color for rating stars
    isHalf: true,
  };
  function addCart(prod) {
    console.log(prod);
    dispatch(addToCart(prod))
  }
  return (
    <>
      {singleProduct.isLoading == true ? (
        <Loader />
      ) : (
        <>
          <p className="text-3xl md:text-4xl px-8 py-4">Product Details</p>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start px-8 py-4 bg-blue-100 rounded-lg shadow-lg">
            {/* Product image */}
            <div className="md:w-[40%] px-4 my-auto">
              {product && (
                <img
                  src={product?.images?.[0]?.url}
                  alt=""
                  className="w-full md:max-w-sm mx-auto rounded-lg shadow-sm object-contain md:float-right md:h-full drop-shadow-xl"
                />
              )}
            </div>
            {/* Product details */}
            <div className="md:w-[60%] px-4">
              {/* Product category and name */}
              <div className="mb-4">
                <p className="text-xs text-gray-900 uppercase my-1">
                  {product?.category}
                </p>
                <p className="text-3xl font-semibold text-slate-800 capitalize">
                  {product?.name}
                </p>
              </div>
              {/* Ratings and reviews */}
              <div className="mb-4 flex items-center">
                <ReactStars {...options} />
                <p className="text-sm text-gray-500 ml-2">
                  ({product?.numOfReviews}) Reviews
                </p>
              </div>
              {/* Product price */}
              <div className="mb-4 flex items-center">
                <p className="text-3xl text-blue-600 font-semibold">
                  ₹{product.price}
                </p>
                <p className="text-lg line-through text-slate-600 ml-2">
                  ₹{(product.price * 1.5).toFixed(2)}
                </p>
              </div>
              {/* Stock status */}
              <p className="mb-4 flex items-center">
                <span
                  className={`  text-white px-2 py-1 uppercase text-xs ${
                    product.stock <= 1 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {product.stock < 1 && "Out Of Stock"}
                  {product.stock == 1 && "Last Unit"}
                  {product.stock > 1 && "In Stock"}
                </span>
              </p>
              {/* Product description */}
              <p className="text-lg font-normal mb-4">{product.desc}</p>
              {/* Quantity selector and add to cart button */}
              <div className="flex items-center mb-4">
                <Button
                  text={"+"}
                  classes={"bg-gray-500 px-3 py-1 text-lg mr-2"}
                />
                <p className="text-lg">1</p>
                <Button
                  text={"-"}
                  classes={"bg-gray-500 px-3 py-1 text-lg ml-2"}
                />
                <Button
                  fn={() => addCart(product)}
                  text={"Add to Cart"}
                  icon={<FaCartArrowDown />}
                  classes={"bg-blue-700 text-white px-4 py-2 ml-4"}
                />
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="mx-auto my-8 px-8">
            <p className="text-3xl font-semibold mb-4">User Reviews</p>
            <Reviews />
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
