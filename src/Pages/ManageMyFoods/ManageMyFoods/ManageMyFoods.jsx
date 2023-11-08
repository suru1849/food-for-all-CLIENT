import { useEffect, useState } from "react";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";

const ManageMyFoods = () => {
  const { user } = useAuthData();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/availableFood?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  console.log(foods);

  return (
    <>
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
                  <button className="btn btn-circle btn-outline btn-sm">
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
                  <button className="btn btn-success btn-xs">Mange</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageMyFoods;
