import { ImSpinner9 } from "react-icons/im";
import LoaderBtn from "../../../Components/LoaderBtn/LoaderBtn";
import { useState } from "react";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import toast from "react-hot-toast";
import { insertDistributionMoney } from "../../../api/donationDistribution";

function DDonations() {
  const { user } = useAuthData();
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e) => {
    setLoading(false);
    e.preventDefault();

    const form = e.target;

    const donatorName = user?.displayName;
    const donatorEmail = user?.email;
    const donatorImage = user?.photoURL;
    const donatedAmount = form.donatedAmount.value;
    const transactionID = form.transactionID.value;
    const donationSector = form.donationSector.value;
    const organizationName = form.organizationName.value;

    const donationMoney = {
      adminName: donatorName,
      adminEmail: donatorEmail,
      adminImage: donatorImage,
      donatedAmount,
      transactionID,
      donationSector,
      organizationName,
    };

    console.log(donationMoney);

    // add money to the dataBase ---
    try {
      await insertDistributionMoney(donationMoney);

      toast.success("Donation Successed");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div>
      {/* donate Money*/}
      <div>
        <div className="text-center mt-14">
          <h1 className="text-3xl lg:text-4xl font-bold text-rose-400">
            Donate Money To An Organization
          </h1>
        </div>
        <div className="my-10 w-1/2 mx-auto">
          <form onSubmit={handleDonate}>
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Donate Amount
                </label>
                <input
                  type="number"
                  name="donatedAmount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter amount..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="type transaction ID..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organizationName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="type organization name..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="visitors"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Donation Sector
                </label>
                <select
                  name="donationSector"
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled selected>
                    Select Donation Sector
                  </option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Relief</option>
                  <option>Food</option>
                </select>
              </div>
            </div>
            <div>
              <button className="btn btn-primary w-full mt-7" type="submit">
                <LoaderBtn
                  icon={ImSpinner9}
                  label={"Donate"}
                  loading={loading}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DDonations;
