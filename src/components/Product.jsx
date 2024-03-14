import { Link } from "react-router-dom";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";

function Product({ product }) {
  let { _id, category, price, desc, images, rating, name } = product;
  let options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 18,
    value: 3.7,
    activeColor: "salmon",
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${_id}`}
      className=" bg-gray-300 shadow-2xl border border-gray-700 rounded text-black dark:text-white  pb-2  min-w-[290px] shadow-black/70  h-full mx-auto flex flex-col justify-between gap-2 hover:scale-105 duration-150 transition-all "
    >
      {/* img */}
      <div className=" w-full mx-auto overflow-hidden">
        <img
          className="w-full max-h-[250px]  mx-auto hover:scale-105 duration-150 object-contain"
          src={images[0].url}
          alt={name}
        />
      </div>
      {/* details */}
      <div className="px-2">
        <p className="text-left uppercase text-slate-700 text-xs font-normal">
          {category}
        </p>
        <p className="text-left capitalize text-xl">{name}</p>
      </div>
      {/* price */}
      <div className="flex justify-between items-center px-2 gap-2">
        <p className="text-left text-md text-blue-700">
          ${price}{" "}
          <span className="text-xs text-gray-800 line-through">
            ${price * 1.25}
          </span>
        </p>
        <span className="flex justify-center items-center text-md">
          <ReactStars {...options} />
          <p className="text-sm">(200)</p>
        </span>
        <Button text={"Add to Cart"} />
      </div>
    </Link>
  );
}

export default Product;
