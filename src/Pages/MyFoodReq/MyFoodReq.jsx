import { useEffect, useState } from "react";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import axios from "axios";
import Swal from "sweetalert2";

const MyFoodReq = () => {
  const { user } = useAuthData();
  const [reqFoods, setReqFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/requestedFood?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setReqFoods(data));
  }, []);

  const handleCancel = (id) => {
    axios.delete(`http://localhost:5000/requestedFood/${id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          title: "Success!",
          text: "Canceled successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });

        // update ReqFoods
        const remaining = reqFoods.filter((reqFood) => reqFood._id !== id);
        setReqFoods(remaining);
      }
    });
  };

  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto my-10">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Donar Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Request Date</th>
              <th>My Donation Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {reqFoods.map((reqFood, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{reqFood.donator.donatorName}</td>
                <td>{reqFood.food.pickupLocation}</td>
                <td>{`${reqFood.food.expiredDateTime.split("T")[0]},${
                  reqFood.food.expiredDateTime.split("T")[1]
                }`}</td>
                <td>{`${reqFood.requestedDate.split(",")[0]},${
                  reqFood.requestedDate.split(",")[1]
                }`}</td>
                <td>{reqFood.donationMoney}</td>
                <td>{reqFood.food.foodStatus}</td>
                <td>
                  <button
                    onClick={() => handleCancel(reqFood._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodReq;
