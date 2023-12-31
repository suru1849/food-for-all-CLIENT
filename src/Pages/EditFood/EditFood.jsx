import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { useEffect, useState } from "react";
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn";
import { ImSpinner9 } from "react-icons/im";
import { getAFood, updateFood } from "../../api/food";
import { toast } from "react-hot-toast";

const EditFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    getAFood(id).then((data) => setFood(data));
  }, [id]);

  const handleUpdateFood = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantity = form.foodQuantity.value;
    const pickupLocation = form.pickupLocation.value;
    const expiredDateTime = form.expiredDateTime.value;
    const additionalNotes = form.additionalNotes.value;

    const upFood = {
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

    // update food to the dataBase ---
    try {
      await updateFood(id, upFood);

      toast.success("Food Updated Succesfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      // from clear
      setLoading(false);
      form.reset();
      navigate(-1);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Edit Food</title>
      </Helmet>
      <div className="flex flex-col min-h-[calc(100vh)] justify-center">
        <div className="text-center my-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-500">
            Update Your Uploaded Food Information
          </h1>
        </div>
        <div className="my-10">
          <form onSubmit={handleUpdateFood}>
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
                  defaultValue={food?.foodName}
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
                  defaultValue={food?.foodImage}
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
                  defaultValue={food?.foodQuantity}
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
                  defaultValue={food?.pickupLocation}
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
                  type="date"
                  name="expiredDateTime"
                  defaultValue={food?.expiredDateTime}
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
                  defaultValue={food?.additionalNotes}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="additional notes"
                  required
                />
              </div>
            </div>
            <div>
              <button className="btn btn-secondary w-full" type="submit">
                <LoaderBtn
                  icon={ImSpinner9}
                  loading={loading}
                  label={"Update Food"}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default EditFood;
