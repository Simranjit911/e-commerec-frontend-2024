import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductswithQuery } from "../redux/productSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";

function AllProducts() {
  const [filters, setFilters] = useState({
    name: "",
    desc: "",
    rating: "",
    category: "",
    isRecom: "",
    isNew: "",
    isLatest: "",
    price: "",
    resultsPerPage: 10,
    page: 1,
  });
  let dispatch = useDispatch();
  let { products, isLoading, isError } = useSelector((state) => state.products);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  const queryParams = new URLSearchParams(filters).toString();

  const handleApplyFilters = () => {
    dispatch(fetchProductswithQuery(queryParams));
  };

  useEffect(() => {
    dispatch(fetchProductswithQuery(queryParams));
  }, [filters.page]);

  const handlePreviousPage = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: filters.page - 1 }));
  };

  const handleNextPage = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: filters.page + 1 }));
  };

  return (
    <>
      <div className="flex">
        {/* Filters */}
        <aside className="w-[15%] border-r border-black p-4 bg-slate-500">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          {/* Category filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ""}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                All
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="category"
                  value="mobile"
                  checked={filters.category === "mobile"}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Mobiles
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="category"
                  value="laptop"
                  checked={filters.category === "laptop"}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Laptop
              </label>
              {/* Add more categories as needed */}
            </div>
          </div>
          {/* Rating filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Rating Greater Than</h3>
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="rating"
                  value="4"
                  checked={filters.rating === "4"}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                4 Stars & Above
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="rating"
                  value="3"
                  checked={filters.rating === "3"}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                3 Stars & Above
              </label>
              {/* Add more rating options as needed */}
            </div>
          </div>
          {/* Apply filters button */}
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 mr-2"
          >
            Apply Filters
          </button>
        </aside>

        {/* Main */}
        {isLoading && <Loader span={"loading products"} />}
        {!isLoading && isError && (
          <div className="w-[85%] text-center mx-auto p-4">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>Error while fetching data</p>
          </div>
        )}
        {!isLoading && !isError && products?.products?.length < 1 && (
          <div className="w-[85%] text-center mx-auto p-4">
            <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
            <p>No products matching the specified filters.</p>
          </div>
        )}
        {!isLoading && !isError && products?.products?.length > 0 && (
          <main className="w-[85%] text-center mx-auto  p-4">
            {/* Display products here */}
            <h2 className="text-3xl font-semibold mb-2">All Products</h2>
            {/* Example: map through products and display them */}
            <div className="flex flex-wrap gap-5 justify-center items-center">
              {products?.products?.map((p, i) => {
                return <Product product={p} key={i} />;
              })}
            </div>
          </main>
        )}
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center mx-auto my-6">
        <button
          onClick={handlePreviousPage}
          disabled={filters.page === 1}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={products?.products?.length < 6}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 mr-2"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AllProducts;
