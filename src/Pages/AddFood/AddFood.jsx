import { Helmet, HelmetProvider } from "react-helmet-async";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import axios from "axios";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useAuthData();

  const handleAddFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantity = form.foodQuantity.value;
    const pickupLocation = form.pickupLocation.value;
    const expiredDateTime = form.expiredDateTime.value;
    const additionalNotes = form.additionalNotes.value;

    const food = {
      foodName,
      foodImage,
      foodQuantity: parseInt(foodQuantity),
      pickupLocation,
      expiredDateTime,
      additionalNotes,
      donator: {
        donatorImage: user?.photoURL,
        donatorName: user?.displayName,
        donatorEmail: user?.email,
      },
      foodStatus: "available",
    };

    // add food to the dataBase ---
    axios
      .post("https://food-for-all-server.vercel.app/availableFood", food)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          // from clear
          form.reset();
        }
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Add Food</title>
      </Helmet>
      <div className="text-center my-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-500">
          Share Food Share Love
        </h1>
        <p className=" lg:text-lg">Add food details that you want to share</p>
      </div>
      <div className="my-10">
        <form onSubmit={handleAddFood}>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="food name"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="food image url"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Food Quantity
              </label>
              <input
                type="number"
                name="foodQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="food quantity"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="pick up location"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="expired date/time"
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
                name="additionalNotes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="additional notes"
                required
              />
            </div>
          </div>
          <div>
            <input
              className="btn btn-primary w-full"
              type="submit"
              value="Add Food"
            />
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default AddFood;
