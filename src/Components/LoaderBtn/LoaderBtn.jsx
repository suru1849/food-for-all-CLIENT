/* eslint-disable react/prop-types */
const LoaderBtn = ({ icon: Icon, loading, label }) => {
  return (
    <div>
      {loading ? <Icon className="animate-spin mx-auto" size={24} /> : label}
    </div>
  );
};

export default LoaderBtn;
