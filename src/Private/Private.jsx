import { Navigate, useLocation } from "react-router-dom";
import useAuthData from "../Hooks/useAuthData/useAuthData";
import PropTypes from "prop-types";

const Private = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuthData();

  if (user?.email) {
    return children;
  }
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

Private.propTypes = {
  children: PropTypes.node,
};

export default Private;
