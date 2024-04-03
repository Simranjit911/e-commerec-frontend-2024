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
        <div className="px-4">
          <span className="bg-blue-600 text-white rounded-md px-2 py-0.5 text-sm md:text-lg">
            Total Users:{users?.data?.allUsers?.length}
          </span>
          <table className="w-[100%] mx-auto text-center bottom-2 shadow-2xl">
            <thead>
              <tr className="border-2  border-gray-500 bg-slate-400">
                <th>Sr.No.</th>
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
                  <td>{index + 1}</td>

                  <td className="border-1  mx-auto py-0.5  ">
                    <img
                      className="w[10%] mx-auto rounded-xl h-14"
                      src={user?.avatar?.url || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg"}
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
        </div>
      )}
    </div>
  );
}

export default User;
