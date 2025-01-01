import { useQuery } from "@tanstack/react-query";
import useAuthData from "../../../Hooks/useAuthData/useAuthData";
import { getAllDonations } from "../../../api/donation";
import Loader from "../../../Components/Loader/Loader";

const MoneyDonations = () => {
  const { user } = useAuthData();

  const { data: datas = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryFn: async () => await getAllDonations(),
    queryKey: ["datas"],
  });

  //   console.log(datas);

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
          <tbody>
            {/* row 1 */}
            {datas?.map((data) => (
              <tr key={data?._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16 lg:w-20 lg:h-20">
                      <img src={data?.donatorImage} alt="Food Image" />
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{data?.donatorName}</div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{data?.donatorEmail}</div>
                </td>
                <td>
                  <div className="font-bold">{data?.donatedAmount}</div>
                </td>
                <td>
                  <div className="font-bold">{data?.donationSector}</div>
                </td>
                <td>
                  <div className="font-bold">{data?.transactionID}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoneyDonations;
