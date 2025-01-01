import { axiosSecure } from ".";

// Insert donation
export const insertDistributionMoney = async (donationMoney) => {
  const { data } = await axiosSecure.post(
    "/donationDistribution/insert",
    donationMoney
  );

  return data;
};
