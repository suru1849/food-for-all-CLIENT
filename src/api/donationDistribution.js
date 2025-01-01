import { axiosSecure } from ".";

// Insert donation
export const insertDistributionMoney = async (donationMoney) => {
  const { data } = await axiosSecure.post(
    "/donationDistribution/insert",
    donationMoney
  );

  return data;
};

// Get all donations
export const getAllDistributedDonations = async () => {
  const { data } = await axiosSecure("/donationDistribution");

  return data;
};
