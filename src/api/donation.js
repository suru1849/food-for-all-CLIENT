import { axiosSecure } from ".";

// Insert Donation
export const insertDonationMoney = async (donationMoney) => {
  console.log(donationMoney);
  const { data } = await axiosSecure.post(
    "/donationMoney/insert",
    donationMoney
  );

  return data;
};

// Get all donations
export const getAllDonations = async () => {
  const { data } = await axiosSecure("/donationMoney");

  return data;
};

// Get user donations
export const getAddedDonation = async (email) => {
  const { data } = await axiosSecure(`/donationMoney/${email}`);

  return data;
};
