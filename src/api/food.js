import { axiosSecure } from ".";

// get food sorted by the number of quantity
export const getSortedFood = async () => {
  const { data } = await axiosSecure("availableFood?quantity=1");

  return data;
};

// Insert food
export const insertFood = async (food) => {
  const { data } = await axiosSecure.post("/foods/insert", food);

  return data;
};

// Get foods
export const getFoodSortedByQNT = async () => {
  const { data } = await axiosSecure("/foods?sort=quantity");

  return data;
};
