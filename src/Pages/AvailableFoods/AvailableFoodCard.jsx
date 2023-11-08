import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AvailableFoodCard = ({ food }) => {
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    donator,
    foodStatus,
    additionalNotes,
  } = food || {};
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="min-w-fit h-full  flex">
        <img
          className="object-cover w-full rounded-t-lg md:rounded-none md:rounded-l-lg md:h-auto md:w-48 "
          src={foodImage}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal w-full h-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {foodName}
        </h5>
        <div>
          <p className="mb-3 font-semibold text-gray-500 dark:text-gray-400">
            #{additionalNotes}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-red-800">Status</span> :{" "}
            {foodStatus}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-red-800">Quantity</span> :{" "}
            {foodQuantity}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-red-800">Pickup Location</span>{" "}
            : {pickupLocation}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-red-800">
              Expired Date/Time
            </span>{" "}
            : {expiredDateTime.split("T")[0]}, {expiredDateTime.split("T")[1]}
          </p>
          <div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-semibold text-red-800">Donated By</span>,
            </p>
            <div className="flex gap-5 flex-row-reverse justify-center items-center">
              <img
                className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={donator.donatorImage}
                alt="Bordered avatar"
              />
              <p className="font-bold">{donator.donatorName}</p>
            </div>
            <div className="flex justify-end mt-3">
              <Link
                to={`/food-details/${_id}`}
                className="btn btn-success text-right "
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AvailableFoodCard.propTypes = {
  food: PropTypes.object,
};

export default AvailableFoodCard;
