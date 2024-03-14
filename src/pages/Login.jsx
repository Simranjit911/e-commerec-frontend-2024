import Button from "../components/Button";
import { IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";

const Login = () => {
  const [inputVal, setInputVal] = useState({
    email: "s1@g.com",
    password: "",
  });
  let dispatch = useDispatch();
  let { isAuthenticated } = useSelector((state) => state.user);
  let nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated == true) {
      nav("/");
    }
  }, [isAuthenticated]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setInputVal({
      ...inputVal,
      [name]: value,
    });
  }
  function handleLogin() {
    if (inputVal.email === "") {
      return toast.error("Enter Email");
    }
    if (inputVal.password === "") {
      return toast.error("Enter password");
    }
  
    dispatch(loginUser(inputVal));
  }
  return (
    <div className="h-[400px] w-[90%] md:w-[60%] m-auto text-center py-6 flex justify-center items-center">
      <div className="border-blue-400 border flex flex-col gap-5 px-6 py-6 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
        {/* text */}
        <h2 className="text-2xl font-normal flex justify-center items-center">
          Sign Into your Account
          <IoIosLogIn />{" "}
        </h2>

        <form>
          <input
            name="email"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleInputChange}
            value={inputVal.email}
            className="placeholder:text-gray-500 outline outline-blue-400  hover:outline-2 hover:outline-blue-600 mx-1 my-1 px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%]"
          />
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            value={inputVal.password}
            onChange={handleInputChange}
            className="placeholder:text-gray-500 outline outline-blue-400  hover:outline-2 hover:outline-blue-600 mx-1  px-2 text-xl py-1 shadow-xl my-3 w-full md:w-[80%] lg:w-[90%] xl:w-[80%]"
          />
        </form>
        <Button
          text={"Login"}
          fn={handleLogin}
          classes={"w-full md:w-[80%] mx-auto py-2 text-lg"}
        />
        <Link to={"/"} className="underline text-right text-blue-600">
          Forget Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
