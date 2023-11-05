import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const useAuthData = () => {
  const all = useContext(AuthContext);

  return all;
};

export default useAuthData;
