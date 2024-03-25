import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
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
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Convert filters object to query parameters string
  const queryParams = new URLSearchParams(filters).toString();

  // Fetch products when filters or page change
  useEffect(() => {
    dispatch(fetchProductswithQuery(queryParams));
  }, [dispatch, filters.page, queryParams]);

  // Calculate total number of pages based on total products and results per page
  const totalPages = Math.ceil(
    products?.totalProducts / filters.resultsPerPage
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setFilters((prevFilters) => ({ ...prevFilters, page: pageNumber }));
  };

  // Generate array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to apply filters
  const handleApplyFilters = () => {
    dispatch(fetchProductswithQuery(queryParams));
  };

  return (
    <>
      <div className="flex">
        {/* Filters */}
        {/* Your filter component here */}
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
        {isLoading && (
          <div className="my-6 mx-auto">
            <Loader span={"Loading products All Products"} />
          </div>
        )}
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
              {products?.products?.map((p, i) => (
                <Product product={p} key={i} />
              ))}
            </div>
          </main>
        )}
      </div>
      {/* Pagination */}
      {!isLoading && !isError && products?.products?.length > 0 && (
        <div className="mt-4 flex justify-center items-center mx-auto my-6">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 mr-2 ${
                filters.page === pageNumber
                  ? "font-bold bg-blue-900 shadow-xl"
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default AllProducts;
