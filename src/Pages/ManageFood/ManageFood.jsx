import { useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { getReqFoodByFoodId, updateReqFoodStatus } from "../../api/requestFood";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { updateFoodStatus } from "../../api/food";
import Chat from "../../Components/Chat/Chat";

const ManageFood = () => {
  const { user } = useAuthData();
  const { id } = useParams();

  const {
    data: food = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryFn: async () => await getReqFoodByFoodId(id),
    queryKey: ["food"],
  });

  const handleDelivered = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delivered it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // update Status of request food
          await updateReqFoodStatus(food?._id, { status: "delivered" });

          // update food status
          await updateFoodStatus(id, { status: "delivered" });

          toast.success("Delivered Successfully");
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
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Mange A Single Food</title>
      </Helmet>
      <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
        {food ? (
          <div className="overflow-x-auto my-10  w-full">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Requester Name</th>
                  <th>Requester Image</th>
                  <th>Requester Email</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Chat With Reciever</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                <tr className="space-x-3">
                  <td className="text-lg font-semibold">
                    {food?.requester?.name}
                  </td>
                  <td className="text-lg font-semibold">
                    <div className=" w-24 h-24">
                      <img
                        src={food?.requester?.image}
                        className="object-center w-full h-full rounded-xl"
                      />
                    </div>
                  </td>
                  <td className="text-lg font-semibold">
                    {food?.requester?.email}
                  </td>
                  <td className="text-lg font-semibold">
                    {food?.requestedDate}
                  </td>
                  <td
                    className={`text-lg font-semibold ${
                      food?.status !== "delivered"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {food?.status}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Chat
                    </button>
                    {/* Chat Modal Start */}
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="p-1">
                          <Chat requester_email={food?.requester?.email} />
                        </div>
                      </div>
                    </dialog>
                    {/* Chat Modal End */}
                  </td>
                  <td>
                    <button
                      disabled={food?.status === "delivered"}
                      onClick={handleDelivered}
                      className="btn btn-success"
                    >
                      Delivere
                    </button>
                  </td>
                </tr>
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

export default ManageFood;
