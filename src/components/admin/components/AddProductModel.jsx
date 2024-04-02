import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../../redux/productSlice";

function AddProductModel({ fn }) {
  let dispatch = useDispatch();
  let [imgOrFile, setImgOrFile] = useState(false);
  const [inputVal, setInputVal] = useState({
    name: "",
    desc: "",
    price: 1,
    category: "",
    stock: 1,
    isLatest: false,
    isRecom: false,
    imageUrl: "", // New state for storing image URL
    file: null, // New state for storing uploaded file
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  }

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    setInputVal({ ...inputVal, file });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputVal.name);
    formData.append("desc", inputVal.desc);
    formData.append("price", inputVal.price);
    formData.append("category", inputVal.category);
    formData.append("stock", inputVal.stock);
    formData.append("isLatest", inputVal.isLatest);
    formData.append("isRecom", inputVal.isRecom);
    if (inputVal.file) {
      formData.append("file", inputVal.file);
    } else {
      formData.append("imageUrl", inputVal.imageUrl);
    }

    dispatch(addNewProduct(formData));

    setInputVal({
      name: "",
      desc: "",
      price: 1,
      category: "",
      stock: 1,
      isLatest: false,
      isRecom: false,
      imageUrl: "", // New state for storing image URL
      file: null, // New state for storing uploaded file
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-slate-300 text-black px-8 py-4 rounded-lg relative top-56 md:w-[60%] shadow-xl h-fit ">
        <button
          onClick={() => fn()}
          className="absolute top-8 right-5 text-xl hover:scale-110 duration-100 p-2"
        >
          <CgClose />
        </button>
        <h2 className="text-2xl text-center font-semibold mb-4 text-blue-600 ">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Product Name:
            </label>
            <input
              required
              type="text"
              id="name"
              placeholder="Enter Product Name"
              name="name"
              value={inputVal.name}
              onChange={handleInputChange}
              className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
            />
          </div>
          <div
            onClick={() => setImgOrFile((prev) => !prev)}
            className="text-center  bg-blue-600 text-white py-2 rounded-lg my-2 shadow-xl w-[70%]"
          >
            {imgOrFile ? "or Give Image Url" : "or Upload Product Image"}
          </div>
          {/* Conditional rendering for image URL or file upload */}
          {imgOrFile ? (
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Upload Product Image:
              </label>
              <input
                required
                type="file"
                id="file"
                name="file"
                onChange={handleFileInputChange}
                className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Product Image URL:
              </label>
              <input
                required
                type="text"
                id="imageUrl"
                placeholder="Enter Product Image URL"
                name="imageUrl"
                value={inputVal.imageUrl}
                onChange={handleInputChange}
                className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
              />
            </div>
          )}
          {/* desc */}
          <div className="mb-4">
            <label
              htmlFor="desc"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Product Description:
            </label>
            <textarea
              required
              id="desc"
              placeholder="Enter Product Description"
              name="desc"
              rows={10}
              value={inputVal.desc}
              onChange={handleInputChange}
              className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] resize-none"
            />
          </div>
          {/* price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Product Price:
            </label>
            <input
              required
              type="number"
              id="price"
              placeholder="Enter Product Price"
              name="price"
              value={inputVal.price}
              onChange={handleInputChange}
              className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
            />
          </div>
          {/* category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Product Category:
            </label>
            <input
              required
              type="text"
              id="category"
              placeholder="Enter Product Category"
              name="category"
              value={inputVal.category}
              onChange={handleInputChange}
              className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
            />
          </div>
          {/* stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Product Stock:
            </label>
            <input
              required
              type="number"
              id="stock"
              placeholder="Enter Product Stock"
              name="stock"
              value={inputVal.stock}
              onChange={handleInputChange}
              className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[100%] "
            />
          </div>
          {/* is latest */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="isLatest"
              className="block text-lg font-medium text-gray-700 mr-2"
            >
              Is Latest:
            </label>
            <select
              id="isLatest"
              name="isLatest"
              value={inputVal.isLatest}
              onChange={handleInputChange}
              className="outline-none border border-blue-400 px-2 py-1 rounded-md shadow-md"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {/* is Recom */}
          <div className="flex items-center">
            <label
              htmlFor="isRecom"
              className="block text-lg font-medium text-gray-700 mr-2"
            >
              Is Recommended:
            </label>
            <select
              id="isRecom"
              name="isRecom"
              value={inputVal.isRecom}
              onChange={handleInputChange}
              className="outline-none border border-blue-400 px-2 py-1 rounded-md shadow-md"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button
            className="text-center w-full bg-blue-600 text-white py-2 rounded-lg my-4 shadow-xl"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModel;
