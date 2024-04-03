import { useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  let nav = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (user.name == ""||user=={}) {
      console.log("cal");
      handleLogout(dispatch, nav);
    }
  }, []);

  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center bg-gray-200 min-h-[500px]">
      <img
        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg"
        alt="Profile Avatar"
        className="rounded-full w-32 h-32 mb-4 object-cover shadow-xl drop-shadow-sm hover:scale-95 cursor-pointer duration-150"
      />

      <div className="bg-blue-200  rounded-lg p-6 text-center shadow-xl">
        <p className="text-lg font-semibold">Name:{user?.name}</p>
        <p className="text-gray-600">Email:{user?.email}</p>
        <p className="text-slate-600 mt-2">
          <span className="text-xl font-bold"> User ID:</span> {user?._id}
        </p>
      </div>
    </div>
  );
}

export default MyProfile;
