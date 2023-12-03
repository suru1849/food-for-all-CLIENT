import { axiosSecure } from ".";

// Save requested Food
export const saveRequestedFood = async (food) => {
  const { data } = await axiosSecure.post("/req-food", food);

  return data;
};

// Update req food status
export const updateReqFoodStatus = async (id, status) => {
  const { data } = await axiosSecure.put(`/req-food/update/${id}`, status);

  return data;
};

// Get requested food by email
export const getReqFoods = async (email) => {
  const { data } = await axiosSecure(`/req-food/${email}`);

  return data;
};

// Delete req food
export const deleteReqFood = async (id) => {
  const { data } = await axiosSecure.delete(`/req-food/delete/${id}`);

  return data;
};

// Get requested food my foodID
export const getReqFoodByFoodId = async (id) => {
  const { data } = await axiosSecure(`/req-food/foodID/${id}`);

  return data;
};
