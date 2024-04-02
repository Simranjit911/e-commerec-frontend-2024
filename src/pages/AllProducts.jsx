import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
import Loader from "../components/Loader";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFilter } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { MdNotificationsActive } from "react-icons/md";

function AllProducts() {
  let { searchval } = useParams();
  let { filters, setFilters } = useContext(DarkModeContext);
  let [filterlen, setfilterlen] = useState(0);
  // const [filters, setFilters] = useState({
  //   name: searchval || "",
  //   desc: "",
  //   rating: "",
  //   category: "",
  //   isRecom: "",
  //   isNew: "",
  //   isLatest: "",
  //   price: "",
  //   resultsPerPage: 9,
  //   page: 1,
  // });
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  const queryParams = new URLSearchParams(filters).toString();
  let t =
    filters.category != "" ||
    filters.price != "" ||
    filters.rating != "" ||
    filters.name != ""
      ? products?.products?.length
      : products?.totalProducts;
  const totalPages = Math.ceil(t / filters.resultsPerPage);

  const startIndex = (filters.page - 1) * filters.resultsPerPage + 1;
  const endIndex = Math.min(filters.page * filters.resultsPerPage, t);
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
  useEffect(() => {
    if (searchval) {
      setFilters((prevFilters) => ({ ...prevFilters, name: searchval }));
    }
    dispatch(fetchProductswithQuery(queryParams));
  }, [filters.page, dispatch, queryParams]);

  const [isOpen, setIsOpen] = useState(true);
  const handleSidebarToggle = () => {
    setIsOpen((p) => !p);
  };
  return (
    <>
      <div className="flex min-h-[600px] ">
        {/* Filters */}
        <aside
          className={` absolute left-0 min-h-screen
           transition-all duration-500 ease-in-out z-10 
          h-[100%]  bg-slate-200 shadow-2xl
          ${!isOpen ? "w-[220px]" : "w-0 "}
        `}
        >
          <button
            className="sticky left-2 top-14 bg-blue-500 text-md md:text-xl p-1 rounded focus:outline-none flex items-center mx-3 transition-all duration-500"
            onClick={handleSidebarToggle}
          >
            <BsFilter />
            Filters{" "}
            <span className="bg-blue-800 text-xs p-1 rounded-[100%] text-white shadow-xl absolute bottom-6 left-16 ">
            {filters.name !== "" || filters.category !== "" || filters.rating !== "" ? <MdNotificationsActive /> : null}
            </span>
          </button>
          {/* Search  */}
          <div
            className={` transition-all duration-500 ease-in-out ml-3 my-4  mt-8 ${
              isOpen && "hidden"
            }`}
          >
            <input
              type="search"
              className={`text-black border-2 transition-all duration-500 focus:border-blue-800 border-blue-600 outline-none  shadow-xl px-1 ${
                isOpen && "hidden"
              } `}
              value={filters.name}
              placeholder="Search Products"
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>

          {/* Category filter */}
          <div
            className={` transition-all duration-500 ease-in-out ml-3 my-4 ${
              isOpen && "hidden"
            }`}
          >
            <h3 className="text-lg font-semibold  text-gray-800">Categories</h3>
            <div
              className={` transition-all duration-500 ease-in-out ml-2 mb-4 ${
                isOpen && "hidden"
              }`}
            >
              <div>
                <label className="flex items-center mb-2 text-gray-600">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filters.category === ""}
                    onChange={handleFilterChange}
                    className="mr-2 text-blue-600"
                  />
                  All
                </label>
                {/* Map through categories array and generate radio buttons */}
                {products?.categories?.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center capitalize mb-2 text-gray-600"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={handleFilterChange}
                      className="mr-2 text-blue-600"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Rating filter */}
          <div
            className={` transition-all duration-500 ease-in-out ml-3 mb-4 ${
              isOpen && "hidden"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Rating</h3>
            <div>
              <label className="flex items-center mb-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rating"
                  value=""
                  checked={filters.rating === ""}
                  onChange={handleFilterChange}
                  className="mr-2 text-blue-600"
                />
                All
              </label>
              <label className="flex items-center mb-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rating"
                  value="4"
                  checked={filters.rating === "4"}
                  onChange={handleFilterChange}
                  className="mr-2 text-blue-600"
                />
                4 Stars & Above
              </label>
              <label className="flex items-center mb-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rating"
                  value="3"
                  checked={filters.rating === "3"}
                  onChange={handleFilterChange}
                  className="mr-2 text-blue-600"
                />
                3 Stars & Above
              </label>
              {/* Add more rating options as needed */}
            </div>
          </div>
          {/* Apply filters button */}
          <button
            onClick={handleApplyFilters}
            className={`bg-blue-600 text-white ml-3 px-4 py-2 cursor-pointer hover:bg-blue-900 transition-all duration-500 ease-in-out  ${
              isOpen && "hidden"
            }`}
          >
            Apply Filters
          </button>
        </aside>

        {/* Main */}
        {isLoading && (
          <div className="my-6 mx-auto">
            <Loader span={"Loading "} />
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
          <main className="w-full text-center mx-auto container  p-4">
            {/* Display products here */}
            <div className="text-md md:text-xl border border-gray-500 my-4 md:mx-28 px-3 font-normal mb-2">
              <p className="text-left">
                Showing {startIndex} - {endIndex} of {t} results
                {filters.name ? (
                  <span className="text-blue-600">
                    {" "}
                    for "{filters.name.toLowerCase()}"
                  </span>
                ) : (
                  filters.category && (
                    <span className="text-blue-600">
                      {" "}
                      for "{filters.category.toLowerCase()}"
                    </span>
                  )
                )}
              </p>
            </div>

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
