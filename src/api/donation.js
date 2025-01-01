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

// Get donations
export const getAllDonations = async () => {
  const { data } = await axiosSecure("/donationMoney");

  return data;
};
