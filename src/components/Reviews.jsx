import React, { useState, useEffect, useLayoutEffect } from "react";
import Review from "./Review";
import axios from "../axiosConfig";
import Loader from "./Loader";
import { addProductReview, fetchSingleProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import { getLoggedUserOrder } from "../redux/orderSlice";
import { Link } from "react-router-dom";

function Reviews({ pId, productRating }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
    description: "",
    startSelected: false,
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { rating, comment, description, startSelected } = formData;
  const { user } = useSelector((state) => state.user);
  const { myOrders } = useSelector((state) => state.order);
  const [error, setError] = useState(null);
  let { order } = myOrders;
  useEffect(() => {
    fetchReviews();
    dispatch(getLoggedUserOrder());
  }, [pId, formData.startSelected]);

  function checkOrderBeforeReview() {
    if (order.total < 1) {
      return false;
    } else {
      let { order: orders } = order;
      let orderedProd = orders?.map((i) => i.orderedItems);
      orderedProd = orderedProd.flat(3);

      let findOrder=false;
   
      orderedProd?.map((i) => {
        if(i.productId==pId){
          findOrder=true
        }
      });
      return findOrder;
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/product/getallreviews/${pId}`);
      setReviews(response?.data?.allreviews);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = checkOrderBeforeReview();

      if (!startSelected) {
        return toast.error("Select Rating");
      }
      if (description.length > 100) {
        return toast.error("Describe in 100 words");
      }
      if (comment.length > 50) {
        return toast.error("Describe comment in 50 words");
      }
      if (!checkOrderBeforeReview()) {
        console.log(checkOrderBeforeReview());
        return toast.error("You must order the product before adding a review");
      }
      const data = { rating, comment, description, productId: pId };
      dispatch(addProductReview(data));

      setFormData({
        rating: 0,
        comment: "",
        description: "",
        startSelected: false,
      });
      setTimeout(() => {
        // fetchReviews();
        dispatch(fetchSingleProduct(pId));
      }, 1200);
    } catch (error) {
      setError(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      const userReviewIndex = reviews.findIndex(
        (review) => review.user === user._id
      );
      if (userReviewIndex !== -1) {
        const userReview = reviews[userReviewIndex];
        const remainingReviews = [
          ...reviews.slice(0, userReviewIndex),
          ...reviews.slice(userReviewIndex + 1),
        ];
        setReviews([userReview, ...remainingReviews]);
      }
    }
  }, []);

  return (
    <div>
      {loading && <Loader span={"Loading Reviews"} />}
      {error && <div>Error: {error}</div>}

      <div className="flex flex-col md:flex-row-reverse ">
        {!user ? (
          <div className="text-xl text-center my-auto w-full md:w-[50%] items-center justify-center">
            Please{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline hover:text-blue-800"
            >
              Login!
            </Link>{" "}
            to write review
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-center w-full md:w-[50%] "
          >
            <div className="flex flex-col w-full gap-4 justify-center text-center items-center">
              <label className="text-xl font-normal text-center py-1">
                Write Product Review
                <ReactStars
                  count={5}
                  onChange={(newRating) => {
                    setFormData({
                      ...formData,
                      rating: newRating,
                      startSelected: true,
                    });
                  }}
                  size={35}
                  activeColor="salmon"
                />
              </label>

              <input
                type="text"
                value={comment}
                required
                maxLength={50}
                placeholder="Describe your comment in 50 words"
                className="md:w-[75%] px-2 py-1 text-lg w-[80%]"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />

              <textarea
                maxLength={100}
                value={description}
                required
                placeholder="Describe your Experience in 100 words"
                className="md:w-[75%] px-2 py-1 text-lg w-[80%]"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
              />
            </div>
            <Button
              type="submit"
              text={"Submit Review"}
              classes={"my-3 text-xl md:w-1/2"}
            />
          </form>
        )}

        {reviews.length > 0 ? (
          <div className="md:w-[50%] flex justify-center items-center flex-wrap gap-6 my-6 overflow-x-auto md:px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {productRating != 0 && (
              <div className="flex items-center text-xl font-semibold  gap-2">
                <p className="md:text-xl font-semibold">Overall Rating:</p>
                <ReactStars
                  count={5}
                  value={Number(productRating.toFixed(2))} // You should replace this with your actual product rating value
                  size={25}
                  edit={false} // Disable editing of the rating
                  activeColor="salmon" // Change the color of the stars
                  // You can use className or classNames
                />
                ({productRating.toFixed(1)})
              </div>
            )}
            {reviews?.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </div>
        ) : (
          <div className="md:w-[50%] flex justify-center items-center flex-wrap gap-6 my-6 overflow-x-auto md:px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 text-2xl font-semibold">
            No Reviews Yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
