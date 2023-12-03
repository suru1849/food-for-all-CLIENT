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

// Get foods sorted by quantity
export const getFoodSortedByQNT = async () => {
  const { data } = await axiosSecure("/foods?quantity=-1");

  return data;
};

// Get all available foods
export const getAllFoods = async (sort, searchItem) => {
  const { data } = await axiosSecure(
    `/foods?expiredate=${sort}&searchItem=${searchItem}`
  );

  return data;
};
