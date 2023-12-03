/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn";
import { ImSpinner9 } from "react-icons/im";

const RequestFoodModal = ({
  openModal,
  food,
  setOpenModal,
  handleRequest,
  loading,
}) => {
  const { user } = useAuthData();

  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Request For This Food</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
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
                    defaultValue={food?.foodName}
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
                    defaultValue={food?.foodImage}
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
                    defaultValue={food?.donator?.donatorName}
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
                    defaultValue={food?.donator?.donatorEmail}
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
                    defaultValue={food?.pickupLocation}
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
                    defaultValue={food?.expiredDateTime}
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
                    defaultValue={new Date().toISOString().split("T")[0]}
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
                <button className="btn btn-primary w-full" type="submit">
                  <LoaderBtn
                    icon={ImSpinner9}
                    label={"Request"}
                    loading={loading}
                  />
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RequestFoodModal;
