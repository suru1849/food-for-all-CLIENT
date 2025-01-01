import { useQuery } from "@tanstack/react-query";
import { getAllDistributedDonations } from "../../../api/donationDistribution";
import Loader from "../../../Components/Loader/Loader";

function DistributedDonationSection() {
  const { data: datas = [], isLoading } = useQuery({
    enabled: true,
    queryFn: async () => await getAllDistributedDonations(),
    queryKey: ["datas"],
  });

  console.log(datas);
  //   console.log(datas[0]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-center font-kenia  text-4xl mt-28">
        Donation Distributed
      </h1>
      <div className="flex flex-wrap gap-5 justify-center justify-items-center py-14 ">
        {datas?.map((data) => (
          <div
            key={data._id}
            className="card  border shadow text-green-500 hover:scale-105 transition"
          >
            <div className="card-body">
              <h2 className="card-title">
                <span className="text-blue-500 font-bold">
                  Donation Amount:{" "}
                </span>
                {data?.donatedAmount} tk.
              </h2>
              <h2 className="card-title">
                <span className="text-blue-500 font-bold">
                  Organizayion Name:{" "}
                </span>
                {data?.organizationName}
              </h2>
              <h2 className="card-title">
                <span className="text-blue-500 font-bold">
                  Donation Sector:{" "}
                </span>
                {data?.donationSector}
              </h2>
              <h2 className="card-title">
                <span className="text-blue-500 font-bold">Donator Admin,</span>
              </h2>
              <div className="flex gap-5 flex-row-reverse justify-center items-center">
                <img
                  className="w-14 h-14 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={data?.adminImage}
                  alt="Bordered avatar"
                />
                <p className="font-bold flex flex-col">
                  <span>{data?.adminName}</span>
                  <span className="text-orange-400">{data?.adminEmail}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DistributedDonationSection;
