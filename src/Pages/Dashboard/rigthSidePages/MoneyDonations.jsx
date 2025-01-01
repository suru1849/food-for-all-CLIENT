import { useQuery } from "@tanstack/react-query";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import { getAllDonations } from "../../../api/donation";
import Loader from "../../../Components/Loader/Loader";

const MoneyDonations = () => {
  const { user } = useAuthData();

  const {
    data: datas = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryFn: async () => await getAllDonations(),
    queryKey: ["datas"],
  });

  console.log(datas);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mt-1 mb-4">
        Total Donations: <span className="opacity-50">{datas.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Donor Image</th>
              <th>Donor Name</th>
              <th>Donor Email</th>
              <th>Donated Amount</th>
              <th>Donation Sector</th>
              <th>TransactionID</th>
            </tr>
          </thead>
          <tbody>{/* row 1 */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MoneyDonations;
