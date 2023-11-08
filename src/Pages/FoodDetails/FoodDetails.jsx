import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import axios from "axios";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const [food] = useLoaderData();
  const { user } = useAuthData();
  const navigate = useNavigate();

  const {
    _id,
    donator,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
  } = food || {};

  const handleRequest = (e) => {
    e.preventDefault();

    const form = e.target;
    const donationMoney = form.donationMoney.value;
    const AdditionlNotes = form.AdditionlNotes.value;
    const requestedDate = form.requestedDate.value;

    const requestedFood = {
      useEmail: user?.email,
      donationMoney,
      AdditionlNotes,
      requestedDate,
      food,
      donator: food?.donator,
    };

    console.log(requestedFood);
    // added requested food
    axios
      .post("http://localhost:5000/requestedFood", requestedFood)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food request successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          // navigate
          navigate("/available-foods");
          // from clear
          form.reset();
        }
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Food For All | Food Details - ${_id}`}</title>
      </Helmet>
      <div>
        {/* donator info */}
        <div className="mt-8 mb-5">
          <h1 className="text-md md:text-lg font-bold my-3">Donator: </h1>
          <div className="flex justify-around text-center">
            <div className="avatar">
              <div className="rounded-full w-16">
                <img src={donator.donatorImage} alt="Image" />
              </div>
            </div>
            <div>
              <p className="font-bold">Name</p>
              <p className="text-sm opacity-50">{donator.donatorName}</p>
            </div>
            <div>
              <p className="font-bold">Pick Up Location</p>
              <p className="text-sm opacity-50">{pickupLocation}</p>
            </div>
          </div>
        </div>
        {/* Food info */}
        <div className="mt-24 mb-5">
          <h1 className="text-md md:text-lg font-bold my-6">Donated Food: </h1>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-around  text-center space-y-5">
            <div className="avatar">
              <div className="mask mask-squircle w-40 h-40">
                <img className="object-cover" src={foodImage} alt="Image" />
              </div>
            </div>
            <div>
              <p className="font-bold">Name</p>
              <p className="text-sm opacity-50">{foodName}</p>
            </div>
            <div>
              <p className="font-bold">Food Quantity</p>
              <p className="text-sm opacity-50">{foodQuantity}</p>
            </div>
            <div>
              <p className="font-bold">Expired Date/Time</p>
              <p className="text-sm opacity-50">
                {expiredDateTime.split("T")[0]}, {expiredDateTime.split("T")[1]}
              </p>
            </div>
            <div>
              <button
                className="btn btn-success"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Request For Food
              </button>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal pt-14">
              <div className=" modal-box ">
                <form onSubmit={handleRequest}>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Food Name
                      </label>
                      <input
                        type="text"
                        name="foodName"
                        defaultValue={foodName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="food name"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Food Image
                      </label>
                      <input
                        type="url"
                        name="foodImage"
                        defaultValue={foodImage}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="food image url"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donator Name
                      </label>
                      <input
                        type="text"
                        name="donatorName"
                        defaultValue={donator.donatorName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="food quantity"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donator Email
                      </label>
                      <input
                        type="text"
                        name="donatorEmail"
                        defaultValue={donator.donatorEmail}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="food quantity"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Email
                      </label>
                      <input
                        type="text"
                        name="userEmail"
                        defaultValue={user?.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="food quantity"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Pick Up Location
                      </label>
                      <input
                        type="text"
                        name="pickupLocation"
                        defaultValue={pickupLocation}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="pick up location"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Expired Date/Time
                      </label>
                      <input
                        type="text"
                        name="expiredDateTime"
                        defaultValue={expiredDateTime.split("T")[0]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="expired date/time"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Requested Date
                      </label>
                      <input
                        type="text"
                        name="requestedDate"
                        defaultValue={new Date().toLocaleString()}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="expired date/time"
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="visitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Additional Notes
                      </label>
                      <input
                        type="text"
                        name="AdditionlNotes"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="additional notes"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="visitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donation Money
                      </label>
                      <input
                        type="text"
                        name="donationMoney"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="donation money"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      className="btn btn-primary w-full"
                      type="submit"
                      value="Request"
                    />
                  </div>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    <div className="my-10"></div>
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default FoodDetails;
