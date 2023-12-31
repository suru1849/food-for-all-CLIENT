import { useEffect, useState } from "react";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { deleteFood, getAddedFood } from "../../../api/food";

const ManageMyFoods = () => {
  const { user } = useAuthData();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAddedFood(user?.email).then((data) => {
      setFoods(data);
    });
  }, [user?.email]);

  // Remove
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete item
        await deleteFood(id);

        // updateFood
        const remaining = foods.filter((food) => food._id !== id);
        setFoods(remaining);
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Manage My Food</title>
      </Helmet>
      {foods.length > 0 ? (
        <div className="overflow-x-auto my-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Food</th>
                <th>Quantity</th>
                <th>Expired Date/Time</th>
                <th>Pick Up Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <button
                      disabled={food?.foodStatus === "delivered"}
                      onClick={() => handleRemove(food._id)}
                      className="btn btn-circle btn-outline btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={food.foodImage} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{food?.foodName}</div>
                        <div className="text-sm opacity-50 ">
                          {food?.additionalNotes}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{food?.foodQuantity}</td>
                  <td>{food?.expiredDateTime}</td>
                  <td>{food?.pickupLocation}</td>

                  <td>
                    <Link
                      disabled={food?.foodStatus === "delivered"}
                      to={`/edit-food/${food?._id}`}
                      className="btn btn-error btn-xs"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/manage-food/${food?._id}`}
                      className="btn btn-success btn-xs"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl md:text-2xl min-h-[80vh] text-red-600 font-semibold  flex justify-center items-center">
          No Data Found, Please refresh
        </div>
      )}
    </HelmetProvider>
  );
};

export default ManageMyFoods;
