// fix this nothing shoeing dont change imprt stetemtn
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import {
  clearSingleProduct,
  deleteProduct,
  fetchProductswithQuery,
} from "../../../redux/productSlice";

import { MdDelete, MdUpdate } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import AddProductModel from "./AddProductModel";
import UpdateProductModel from "./UpdateProductModel";
import { useNavigate } from "react-router-dom";

function Products() {
  let nav = useNavigate();
  let { products, isError, isLoading, singleProduct } = useSelector(
    (state) => state.products
  );
  let dispatch = useDispatch();
  let [filter, setFilter] = useState({
    page: 1,
    resultsPerPage: 10,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  let [id, setid] = useState(null);
  function handleDelete(id) {
    dispatch(deleteProduct(id));
    setTimeout(() => {
      dispatch(fetchProductswithQuery(new URLSearchParams(filter)));
    }, 200);
  }
  function handleModel() {
    setIsModalOpen((prev) => !prev);
    setTimeout(() => {
      dispatch(fetchProductswithQuery(new URLSearchParams(filter)));
    }, 1000);
  }
  function handleUpdateModel() {
    setUpdateModel((prev) => !prev);
    setTimeout(() => {
      dispatch(fetchProductswithQuery(new URLSearchParams(filter)));
    }, 1000);
  }
  useEffect(() => {
    dispatch(fetchProductswithQuery(new URLSearchParams(filter)));
  }, [filter, dispatch]);

  const totalProducts = products?.totalProducts;

  return (
    <>
      {isLoading && <Loader span={"Loading All Products"} />}

      {!isError && !isLoading && (
        <div className="w-full  px-3 bg-gray-800 text-white h-full flex flex-col justify-center items-center gap-4 py-4">
          <div className="text-xl font-normal w-full flex  justify-around items-center">
            <span className="bg-blue-600 text-white rounded-md px-2 py-0.5 text-sm md:text-lg">
              Total Products:{totalProducts}
            </span>
            <p
              className="text-blue-700 text-lg md:text-3xl 
            "
            >
              All Products
            </p>
            <span
              className="flex justify-center items-center text-sm md:text-2xl gap-1 cursor-pointer hover:scale-110 duration-500"
              onClick={() => handleModel()}
            >
              Add Product
              <CgAdd />
            </span>
          </div>
          {isModalOpen && <AddProductModel fn={handleModel} />}
          {updateModel && <UpdateProductModel fn={handleUpdateModel} id={id} />}
          <table className="w-[100%]  mx-auto text-center bottom-2 shadow-2xl ">
            <thead>
              <tr className="border-2  border-gray-500 bg-slate-400">
                <th>Sr.No.</th>
                <th>Image</th>
                <th className="hidden lg:block">Product Id:</th>
                <th>Name</th>
                <th className="hidden lg:block">Category</th>
                <th>Stock</th>
                <th className="hidden lg:block">Total Reviews</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.products?.map((prod, index) => (
                <tr
                  key={index}
                  className="text-center border border-slate-500 cursor-pointer hover:scale-100 shadow-2xl duration-100 bg-sky-150 hover:bg-slate-500 "
                >
                  <td>{index + 1}</td>
                  <td
                    className="border-1  mx-auto py-0.5  "
                    onClick={() => nav(`/product/${prod._id}`)}
                    title="See Product Details"
                  >
                    <img
                      className="w[10%] mx-auto rounded-xl h-14"
                      src={prod?.images[0]?.url}
                      alt={prod.name}
                    />
                  </td>
                  <td className="text-xs hidden lg:block">{prod._id}</td>
                  <td className="capitalize">{prod.name}</td>
                  <td className="max-w-[150px] wrap capitalize hidden lg:block">
                    {prod.category}
                  </td>
                  <td>{prod.stock}</td>
                  <td className="hidden lg:block">{prod.numOfReviews}</td>
                  <td>{prod.price}</td>
                  <td
                    className="flex h-full justify-center items-center py-5 hover:scale-125 duration-100"
                    onClick={() => {
                      setid(prod._id);
                      handleUpdateModel();
                    }}
                  >
                    <MdUpdate />
                  </td>
                  <td
                    className="pl-7 hover:scale-125 duration-100"
                    onClick={() => handleDelete(prod._id)}
                  >
                    <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {totalProducts > filter.resultsPerPage && (
            <div className="flex justify-center my-4">
              {Array.from(
                { length: Math.ceil(totalProducts / filter.resultsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setFilter({ ...filter, page: index + 1 })}
                    className={`px-4  rounded mr-2 ${
                      filter.page === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
