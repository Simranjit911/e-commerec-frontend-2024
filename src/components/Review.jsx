import { RxAvatar, RxPencil1, RxUpdate } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteReview, fetchSingleProduct } from "../redux/productSlice";
import { useParams } from "react-router-dom";
function Review({ review }) {
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let { id } = useParams();

  const options = {
    edit: false,
    size: window.innerWidth < 600 ? 16 : 20, // Adjust size based on breakpoint
    value: review.rating,
    activeColor: "salmon",
    isHalf: true,
  };

  return (
    <div className=" bg-slate-100 p-3 shadow-xl rounded w-full">
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-1">
          <RxAvatar className="text-blue-800 text-xl bg-blue-200  rounded-full" />
          <div className="text-base font-semibold capitalize text-gray-800">
            {review.name}
          </div>
        </div>
        <div className="flex gap-2">
          <span className="">{new Date(review.reviewTime).toLocaleString('en-US')}</span>
          {/* {user._id == review.user && (
            <button>
              <RxPencil1 />
            </button>
          )} */}
          {user?._id === review.user && (
            <button
              className="hover:scale-110 duration-200"
              onClick={() => {
                let data = {
                  productId: id,
                  reviewId: review._id,
                };
                dispatch(deleteReview(data));
                setTimeout(() => {
                  dispatch(fetchSingleProduct(id));
                }, 300);
              }}
            >
              <RiDeleteBin7Fill />
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 bg-slate-200 p-1 rounded ">
        <div className="text-gray-800 text-xl capitalize ">
          {review.comment}
        </div>
        <div className="flex gap-2 items-center">
          <ReactStars {...options} className="self-start" />({review.rating})
        </div>
        <div className="text-gray-700 text-md  capitalize">
          {review.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis eros in varius aliquam."}
        </div>
      </div>
    </div>
  );
}

export default Review;
