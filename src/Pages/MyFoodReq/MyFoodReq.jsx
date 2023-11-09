import { useEffect, useState } from "react";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MyFoodReq = () => {
  const { user } = useAuthData();
  const [reqFoods, setReqFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/requestedFood?email=${user?.email}`, {
      credentials: true,
    })
      .then((res) => res.json())
      .then((data) => setReqFoods(data));
  }, [user?.email]);

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
    <HelmetProvider>
      <Helmet>
        <title>Food For All | My Food Request</title>
      </Helmet>
      <div>
        {/* table */}
        {reqFoods.length > 0 ? (
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
                    {reqFood.food.foodStatus === "available" ? (
                      <td>
                        <button
                          onClick={() => handleCancel(reqFood._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Cancel
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
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
      </div>
    </HelmetProvider>
  );
};

export default MyFoodReq;
