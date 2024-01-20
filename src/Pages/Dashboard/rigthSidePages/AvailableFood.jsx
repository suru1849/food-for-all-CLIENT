import { useQuery } from "@tanstack/react-query";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import { deleteFood, getAllFoods } from "../../../api/food";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AvailableFood = () => {
  const { user } = useAuthData();

  const {
    data: foods = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryFn: async () => await getAllFoods("", "", "all"),
    queryKey: ["foods"],
  });

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFood(id);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        } finally {
          refetch();
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mt-1 mb-4">
        Total Foods: <span className="opacity-50">{foods.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>FoodImage</th>
              <th>FoodName</th>
              <th>FoodInfo</th>
              <th>FoodStatus</th>
              <th>DonerInfo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {foods?.map((food) => (
              <tr key={food?._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16 lg:w-20 lg:h-20">
                      <img src={food?.foodImage} alt="Food Image" />
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{food?.foodName}</div>
                    <div className="text-sm opacity-50">
                      {food?.additionalNotes}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">
                      Expired-Date:{" "}
                      <span className="opacity-50">
                        {food?.expiredDateTime}
                      </span>
                    </div>
                    <div className="font-bold">
                      Quantity:{" "}
                      <span className="opacity-50">{food?.foodQuantity}</span>
                    </div>
                    <div className="font-bold">
                      Pickup-Location:{" "}
                      <span className="opacity-50">{food?.pickupLocation}</span>
                    </div>
                  </div>
                </td>
                <td
                  className={`uppercase font-semibold
                 ${
                   food?.foodStatus === "delivered"
                     ? "text-green-500"
                     : food?.foodStatus === "pending"
                     ? "text-yellow-500"
                     : "text-slate-300"
                 }`}
                >
                  {food?.foodStatus}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={food?.donator?.donatorImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {food?.donator?.donatorName}
                      </div>
                      <div className="text-sm opacity-50">
                        {food?.donator?.donatorEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <button
                    onClick={() => handleRemove(food?._id)}
                    className="btn btn-ghost btn-xs text-red-500"
                  >
                    Remove
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

export default AvailableFood;
