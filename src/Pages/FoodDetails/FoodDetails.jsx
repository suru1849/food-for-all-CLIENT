import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { useEffect, useState } from "react";
import { getAFood, updateFoodStatus } from "../../api/food";
import RequestFoodModal from "./RequestFoodModal";
import { toast } from "react-hot-toast";
import { saveRequestedFood } from "../../api/requestFood";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const { user } = useAuthData();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAFood(id).then((data) => setFood(data));
  }, [id, loading]);

  const handleRequest = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    // const donationMoney = form.donationMoney.value;
    const AdditionlNotes = form.AdditionlNotes.value;
    const requestedDate = form.requestedDate.value;

    const requestedFood = {
      requester: {
        email: user?.email,
        image: user?.photoURL,
        name: user?.displayName,
      },
      // donationMoney: donationMoney,
      AdditionlNotes,
      requestedDate,
      status: "pending",
      food: {
        foodId: food?._id,
        pickupLocation: food?.pickupLocation,
        image: food?.foodImage,
        foodName: food?.foodName,
        expiredDateTime: food?.expiredDateTime,
      },
      donar: {
        name: food?.donator?.donatorName,
        email: food?.donator?.donatorEmail,
        image: food?.donator?.donatorImage,
      },
    };

    // added requested food to the data base
    try {
      // save food req
      await saveRequestedFood(requestedFood);

      // update food status
      await updateFoodStatus(food?._id, { status: "pending" });

      toast.success("Requested Successfull");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setOpenModal(false);
      setLoading(false);
      // from clear
      navigate("/my-food-request");
      form.reset();
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Food For All | Food Details - ${food?._id}`}</title>
      </Helmet>
      <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center my-5">
        {/* donator info */}
        <div className="mt-8 mb-5">
          <h1 className="text-md md:text-lg font-bold my-3">Donator: </h1>
          <div className="flex justify-around text-center">
            <div className="avatar">
              <div className="rounded-full w-24">
                <img src={food?.donator?.donatorImage} alt="Image" />
              </div>
            </div>
            <div>
              <p className="font-bold">Name</p>
              <p className="text-sm opacity-50">{food?.donator?.donatorName}</p>
            </div>
            <div>
              <p className="font-bold">Pick Up Location</p>
              <p className="text-sm opacity-50">{food?.pickupLocation}</p>
            </div>
          </div>
        </div>
        {/* Food info */}
        <div className="mt-24 mb-5">
          <h1 className="text-md md:text-lg font-bold my-6">Donated Food: </h1>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-around  text-center space-y-5">
            <div className="avatar">
              <div className="mask mask-squircle w-40 h-40">
                <img
                  className="object-cover"
                  src={food?.foodImage}
                  alt="Image"
                />
              </div>
            </div>
            <div>
              <p className="font-bold">Name</p>
              <p className="text-sm opacity-50">{food?.foodName}</p>
            </div>
            <div>
              <p className="font-bold">Food Quantity</p>
              <p className="text-sm opacity-50">{food?.foodQuantity}</p>
            </div>
            <div>
              <p className="font-bold">Expired Date/Time</p>
              <p className="text-sm opacity-50">{food?.expiredDateTime}</p>
            </div>
            <div>
              <button
                className="btn btn-success"
                disabled={
                  user?.email === food?.donator?.donatorEmail ||
                  food?.foodStatus === "pending"
                }
                onClick={() => setOpenModal(true)}
              >
                Request For Food
              </button>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <RequestFoodModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              handleRequest={handleRequest}
              food={food}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default FoodDetails;
