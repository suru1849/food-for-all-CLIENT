import { useNavigate } from "react-router-dom";
import error from "../../assets/error-1349562_1280.png";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-xl text-center">
        <img className="px-2" src={error} alt="" />

        <button
          onClick={() => navigate("/")}
          className="btn btn-primary my-8 text-center"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;
