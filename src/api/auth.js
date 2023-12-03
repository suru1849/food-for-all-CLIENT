import { axiosSecure } from ".";

// Save users
export const saveUser = async (email, user) => {
  const currentUser = {
    email: email,
    image: user?.photoURL,
    name: user?.displayName,
    status: "verified",
  };

  const { data } = await axiosSecure.put(`/users/${email}`, currentUser);

  console.log(data);

  return data;
};

// Get token
export const getToken = async (email) => {
  const { data } = axiosSecure.post("/jwt", { email });

  return data;
};

// CLear token
export const clearToken = async () => {
  const { data } = axiosSecure("/logout");

  return data;
};
