import { useQuery } from "@tanstack/react-query";
import { getUsers, updateUserStatus } from "../../../api/users";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Users = () => {
  const { user } = useAuthData();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user.email,
    queryFn: async () => await getUsers(),
    queryKey: ["users"],
  });

  const handleAction = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUserStatus(id);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        } finally {
          refetch();
          toast.success("Status updated successfully");
        }
      }
    });
  };

  //   console.log(users);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mt-1 mb-4">
        Total Users: <span className="opacity-50">{users.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16 lg:w-24 lg:h-24">
                        <img src={user?.image} alt="Avatar " />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="badge badge-ghost badge-sm">{user?.email}</p>
                </td>
                <td
                  className={`font-bold  ${
                    user?.status === "admin"
                      ? "text-gray-600"
                      : "text-yellow-600"
                  } text-sm uppercase`}
                >
                  {user?.status}
                </td>
                <th>
                  <button
                    onClick={() => handleAction(user?._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    {user?.status === "admin" ? "Undo" : "Make Admin"}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
