import { useLoaderData, useNavigate } from "react-router-dom";

const ManageFood = () => {
  const navigate = useNavigate();
  const [reqfood] = useLoaderData();

  console.log(reqfood);

  const { requester, requestedDate, food } = reqfood || {};

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
                  <button className="btn btn-success btn-xs">
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
