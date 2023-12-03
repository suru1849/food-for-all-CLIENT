import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { deleteReqFood, getReqFoods } from "../../api/requestFood";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-hot-toast";
import { updateFoodStatus } from "../../api/food";

const MyFoodReq = () => {
  const { user } = useAuthData();

  const {
    data: reqFoods = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryFn: async () => await getReqFoods(user?.email),
    queryKey: ["reqFoods"],
  });

  const handleCancel = async (id, foodId) => {
    try {
      // delete req
      await deleteReqFood(id);

      //Update Food Status
      await updateFoodStatus(foodId, { status: "available" });

      toast.success("Canceled Succesfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      refetch();
    }
  };

  if (isLoading) return <Loader />;

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
                  <th>Donar Name</th>
                  <th>Pickup Location</th>
                  <th>Expire Date</th>
                  <th>Request Date</th>
                  <th>My Donation Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {reqFoods.map((data) => (
                  <tr key={data?._id}>
                    <td className="text-md font-semibold">
                      {data?.donar?.name}
                    </td>
                    <td className="text-md font-semibold">
                      {data?.food?.pickupLocation}
                    </td>
                    <td className="text-md font-semibold">
                      {data?.requestedDate}
                    </td>
                    <td className="text-md font-semibold">
                      {data?.food?.expiredDateTime}
                    </td>
                    <td className="text-md font-semibold">
                      $ {data?.donationMoney}
                    </td>
                    <td
                      className={`text-md font-semibold ${
                        data?.status === "pending"
                          ? "text-warning"
                          : "text-success"
                      } `}
                    >
                      {data?.status}
                    </td>
                    <td>
                      <button
                        disabled={data?.status === "delivered"}
                        onClick={() =>
                          handleCancel(data?._id, data?.food?.foodId)
                        }
                        className="btn btn-error btn-xs"
                      >
                        Cancel
                      </button>
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
      </div>
    </HelmetProvider>
  );
};

export default MyFoodReq;
