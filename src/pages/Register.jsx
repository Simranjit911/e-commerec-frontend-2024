import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, loginUser, registerUser } from "../redux/userSlice";
const Register = () => {
  let { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let nav = useNavigate();
  useEffect(() => {
    console.log("auth");
    console.log("useffect call nav");
    if (isAuthenticated) {
      nav("/");
    }
    dispatch(checkAuth());
  }, [registerUser, loginUser,isAuthenticated]);
  const fileInp = useRef(null);
  let [file, setFile] = useState();
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "s@g.com",
    password: "1",
    avatar: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(1);
    if (!file) {
      toast.error("Select Profile");
      console.log("hi");
    }
    console.log(file);
    const formData = new FormData();
    formData.append("name", inputVal.name);
    formData.append("email", inputVal.email);
    formData.append("password", inputVal.password);
    formData.append("avatar", file);

    dispatch(registerUser(formData));
  };

  return (
    <div className="h-full w-[90%] md:w-[60%] m-auto text-center py-6 flex justify-center items-center">
      <div className="border-blue-400 border flex flex-col gap-5 px-6 py-6 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <h2 className="text-2xl font-normal flex justify-center items-center">
          Create an Account
          <IoIosLogIn />
        </h2>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Enter Name"
            type="text"
            required
            onChange={handleInputChange}
            value={inputVal.name}
            className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%]"
          />
          <input
            name="email"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleInputChange}
            value={inputVal.email}
            className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%]"
          />
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            required
            value={inputVal.password}
            onChange={handleInputChange}
            className="placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%]"
          />
          <input
            name="avatar"
            type="file"
            accept="image/*"
            encType="multipart/form-data"
            ref={fileInp}
            onChange={handleFileChange}
            required
            className="text-center flex justify-center items-center w-ful mx-auto"
            id="avatar"
          />
          <label
            htmlFor="avatar"
            className=" hidden placeholder:text-gray-500 outline outline-blue-400 hover:outline-2 hover:outline-blue-600 mx-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%] cursor-pointer"
          >
            {file ? file.name : "Choose Avatar"}
          </label>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-sm text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-2 w-full md:w-[80%] mx-auto py-2 my-4"
            type="submit"
          >
            Register
          </button>
        </form>

        <Link to={"/login"} className="underline text-right text-blue-600">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
