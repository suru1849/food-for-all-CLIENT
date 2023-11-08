import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageFood = () => {
  const navigate = useNavigate();
  const [reqfood] = useLoaderData();

  console.log(reqfood);

  const { _id, requester, requestedDate, food } = reqfood || {};

  const handleStatus = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delivered it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/availableFood/update", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(food),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    });
  };

  return (
    <div>
      {reqfood ? (
        <div className="overflow-x-auto">
          <table className="table mt-20">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Request Time</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-32 h-32">
                        <img src={requester?.photoURL} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{requester?.displayName}</td>
                <td>{requester?.email}</td>
                <td>{requestedDate?.split(", ")[1]}</td>
                <td>{requestedDate?.split(", ")[0]}</td>
                <th>
                  <button
                    onClick={handleStatus}
                    className={`btn ${
                      food?.foodStatus === "available"
                        ? "btn-success"
                        : "btn-error"
                    } btn-xs`}
                  >
                    {food?.foodStatus}
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl md:text-2xl min-h-[40vh] text-red-600 font-semibold  flex justify-center items-center">
          Not Requested Yet
        </div>
      )}
      <div className="flex justify-center mt-32 my-8">
        <button onClick={() => navigate(-1)} className="btn btn-warning">
          Back
        </button>
      </div>
    </div>
  );
};

export default ManageFood;
