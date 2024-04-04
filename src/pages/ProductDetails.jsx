import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "../redux/productSlice";
import Loader from "../components/Loader";
import ReactStars from "react-rating-stars-component";
import { FaCartArrowDown } from "react-icons/fa";
import Button from "../components/Button";
import Reviews from "../components/Reviews";
import { addToCart } from "../redux/cartSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetails() {
  let { id } = useParams();
  let history = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);
  const { singleProduct } = useSelector((state) => state.products);
  let { product } = singleProduct;

  let options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 20,
    value: product?.ratings,
    activeColor: "salmon", // Blue color for rating stars
    // activeColor: "#3182CE",
    isHalf: true,
  };
  function addCart(prod) {
    dispatch(addToCart(prod));
  }
  return (
    <div className="min-h-[500px] my-auto">
      {singleProduct?.isLoading == true ? (
        <div className="h-full mt-36">
          <Loader span={"Loading Product"} />
        </div>
      ) : (
        <>
          {/* Top Arrow */}
          <div className=" flex text-black items-center capitalize  px-8 py-4">
            <p
              onClick={() => history(-1)}
              className="font-bold text-black text-4xl "
            >
              <IoIosArrowRoundBack />
            </p>
            <span className="ml-3 text-gray-600 text-md flex items-center gap-1 text-sm md:text-md">
              {product?.category}
              <MdNavigateNext />
              {product?.name}
            </span>
          </div>
          {/* main div */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start px-8 py-4 bg-blue-100 rounded-lg shadow-lg">
            {/* Product image */}
            <div className="md:w-[40%] px-4 my-auto">
              {product && (
                <img
                  src={product?.images?.[0]?.url}
                  alt=""
                  className="w-full md:max-w-sm mx-auto rounded-lg shadow-sm object-cover md:float-right md:h-full drop-shadow-xl"
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
                  ₹{product?.price}
                </p>
                <p className="text-lg line-through text-slate-600 ml-2">
                  ₹{(product?.price * 1.25).toFixed(2)}
                </p>
              </div>
              {/* Stock status */}
              <p className="mb-4 flex items-center">
                <span
                  className={`  text-white px-2 py-1 uppercase text-xs ${
                    product?.stock <= 1 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {product?.stock < 1 && "Out Of Stock"}
                  {product?.stock == 1 && "Last Unit"}
                  {product?.stock > 1 && "In Stock"}
                </span>
              </p>
              {/* Product description */}
              <p className="text-lg font-normal mb-4">{product?.desc}</p>
              {/* Quantity selector and add to cart button */}
              <div className="flex items-center mb-4">
                <Button
                  fn={() => addCart(product)}
                  text={"Add to Cart"}
                  icon={<FaCartArrowDown />}
                  classes={"bg-blue-700 text-white px-4 py-2 ml-4"}
                />
              </div>
            </div>
          </div>
          {/* Related Products */}
          <div className="">
            <RelatedProducts category={product?.category} id={id} />
          </div>
          {/* Reviews */}
          <div className="mx-auto my-8 px-8">
            <p className="py-2 md:ml-28 font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-sky-600">
              Customer Reviews
            </p>
            <Reviews pId={id} productRating={product?.ratings} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
