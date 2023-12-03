import { axiosSecure } from ".";

// Statistic
export const getStatistics = async () => {
  const { data } = await axiosSecure("/statictic");

  return data;
};
