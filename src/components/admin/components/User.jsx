import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/adminSlice";
import Loader from "../../Loader";

function User() {
  let dispatch = useDispatch();
  let { users, isLoading, isError } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="w-full min-h-[600px] mx-auto bg-gray-800 text-white py-2">
      <p className="text-center text-xl font-semibold my-4">All Users</p>
      {isLoading && <Loader span={"Loading All Users"} />}
      {isError && !isLoading && <div>Something went wrong</div>}
      {!isError && !isLoading && (
        <table className="w-[80%] mx-auto text-center bottom-2 shadow-2xl">
          <thead>
            <tr className="border-2  border-gray-500 bg-slate-400">
              <th>Avatar</th>
              <th>User Id:</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.allUsers?.map((user, index) => (
              <tr
                key={index}
                className="text-center border border-slate-500 cursor-pointer hover:scale-100 shadow-2xl duration-100 bg-sky-150 hover:bg-slate-500"
              >
                <td className="border-1  mx-auto py-0.5  ">
                  <img
                    className="w[10%] mx-auto rounded-xl h-14"
                    src={user?.avatar?.url}
                    alt={user.name}
                  />
                </td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default User;
