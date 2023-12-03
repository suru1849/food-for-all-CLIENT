import { axiosSecure } from ".";

// get food sorted by the number of quantity
export const getSortedFood = async () => {
  const { data } = await axiosSecure("availableFood?quantity=1");

  return data;
};
