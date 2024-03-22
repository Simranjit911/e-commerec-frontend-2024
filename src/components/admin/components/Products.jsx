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

function Products() {
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
  }
  function handleUpdateModel() {
   setUpdateModel((prev) => !prev);
  }
  useEffect(() => {
    dispatch(fetchProductswithQuery(new URLSearchParams(filter)));
  }, [filter]);

  const totalProducts = products?.totalProducts;

  return (
    <>
      {isLoading && <Loader span={"Loading All Products"} />}

      {!isError && !isLoading && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 py-4">
          <div className="text-xl font-normal w-full flex  justify-around items-center">
            <span className="">Total Products:{totalProducts}</span>
            <p
              className="text-blue-700 text-2xl
            "
            >
              All Products
            </p>
            <span
              className="flex justify-center items-center  gap-1 cursor-pointer hover:scale-110 duration-500"
              onClick={() => handleModel()}
            >
              Add Product
              <CgAdd />
            </span>
          </div>
          {isModalOpen && <AddProductModel fn={handleModel} />}
          {updateModel && <UpdateProductModel fn={handleUpdateModel} id={id} />}
          <table className="w-[90%]  mx-auto text-center bottom-2 shadow-2xl ">
            <thead>
              <tr className="border-2  border-gray-500 bg-slate-400">
                <th>Sr.No.</th>
                <th>Image</th>
                <th>Product Id:</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Total Reviews</th>
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
                  <td className="border-1  mx-auto py-0.5  ">
                    <img
                      className="w[10%] mx-auto rounded-xl h-14"
                      src={prod?.images[0]?.url}
                      alt={prod.name}
                    />
                  </td>
                  <td className="text-xs">{prod._id}</td>
                  <td>{prod.name}</td>
                  <td className="max-w-[150px] wrap">{prod.category}</td>
                  <td>{prod.stock}</td>
                  <td>{prod.price}</td>
                  <td>{prod.numOfReviews}</td>
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
          {/* <div className=" w-full mx-auto flex justify-center items-center mb-5">
            <input
              type="number"
              placeholder={filter.resultsPerPage}
              value={filter.resultsPerPage}
              onChange={(e) =>
                setFilter({ ...filter, resultsPerPage: e.target.value })
              }
              className="w-[5%] py-2 rounded-md shadow-xl mx-1"
            />

            <button
              onClick={() =>
                dispatch(fetchProductswithQuery(new URLSearchParams(filter)))
              }
              className={`bg-blue-500 text-white px-4 py-2 rounded `}
            >
              Set
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}

export default Products;
