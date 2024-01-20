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
export const getAllFoods = async (sort = "", searchItem = "", find = "") => {
  const { data } = await axiosSecure(
    `/foods?expiredate=${sort}&searchItem=${searchItem}&find=${find}`
  );

  return data;
};

// Get A single available food
export const getAFood = async (id) => {
  const { data } = await axiosSecure(`/foods/${id}`);

  return data;
};

// Get added food by a donator
export const getAddedFood = async (email) => {
  const { data } = await axiosSecure(`/foods/donator/${email}`);

  return data;
};

// Delete a single food
export const deleteFood = async (id) => {
  const { data } = await axiosSecure.delete(`/foods/delete/${id}`);

  return data;
};

// update a food
export const updateFood = async (id, food) => {
  const { data } = await axiosSecure.put(`/food/update/${id}`, food);

  return data;
};

// update a foodSTatus
export const updateFoodStatus = async (id, status) => {
  const { data } = await axiosSecure.put(`/food/update/status/${id}`, status);

  return data;
};
