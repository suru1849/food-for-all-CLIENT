import { axiosSecure } from ".";

export const getUsers = async () => {
  const data = await axiosSecure("/user");

  return data.data;
};

// Get user Status
export const getUserStatus = async (email) => {
  const { data } = await axiosSecure(`/user/status/${email}`);

  return data.status;
};

// update user status
export const updateUserStatus = async (id) => {
  const { data } = await axiosSecure.put(`/user/${id}`);

  return data;
};
