import { useEffect, useState } from "react";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageMyFoods = () => {
  const { user } = useAuthData();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/availableFood?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

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
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/availableFood/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                confirmButtonText: "Ok",
              });

              // updateFood
              const remaining = foods.filter((food) => food._id !== id);
              setFoods(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      {foods.length > 0 ? (
        <div className="overflow-x-auto my-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Food</th>
                <th>Quantity</th>
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
                        <div className="font-bold">{food.foodName}</div>
                        <div className="text-sm opacity-50 ">
                          {food.additionalNotes}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.pickupLocation}</td>
                  <td>
                    <button className="btn btn-error btn-xs">Edit</button>
                  </td>
                  <td>
                    <Link
                      to={`/manage-food/${food._id}`}
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
    </>
  );
};

export default ManageMyFoods;
