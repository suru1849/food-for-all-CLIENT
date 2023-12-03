import { Navigate, useLocation } from "react-router-dom";
import useAuthData from "../Hooks/useAuthData/useAuthData";
import PropTypes from "prop-types";
import Loader from "../Components/Loader/Loader";

const Private = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuthData();

  if (user?.email) {
    return children;
  }
  if (loading) {
    return <Loader />;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

Private.propTypes = {
  children: PropTypes.node,
};

export default Private;
