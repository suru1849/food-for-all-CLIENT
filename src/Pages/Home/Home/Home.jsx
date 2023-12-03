import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AvailableFoodCard from "../../AvailableFoods/AvailableFoodCard";
import { Link } from "react-router-dom";
import img1 from "../../../assets/image1.png";
import img2 from "../../../assets/image2.png";
import img3 from "../../../assets/image5.png";
import Banner from "../Banner/Banner";
import { getSortedFood } from "../../../api/food";

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getSortedFood().then((data) => {
      console.log(data);
      setFoods(data);
    });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Home</title>
      </Helmet>
      <Banner />
      <div>
        {/* featured food */}
        <div>
          <h1 className="text-center font-kenia  text-4xl mt-28">
            Featured Foods
          </h1>
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 my-10">
            {foods.slice(0, 4).map((food) => (
              <AvailableFoodCard key={food._id} food={food}></AvailableFoodCard>
            ))}
          </div>
          <div className="flex justify-center items-center mb-10">
            <Link to="/available-foods" className="btn btn-warning">
              Show All
            </Link>
          </div>
        </div>
        {/* our servuces */}
        <div>
          <h1 className="text-center font-kenia  text-4xl mt-28">
            Our Services
          </h1>
          <div className="flex flex-col md:flex-row gap-5 my-16">
            {/* one */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg">
              <img className="w-56" src={img1} />
              <p>Best Service Promise</p>
            </div>
            {/* two */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg">
              <img className="w-56" src={img2} />
              <p>Fullfill Your Needs</p>
            </div>
            {/* Three */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg">
              <img className="w-56" src={img3} />
              <p>24/7 hr Customer Care</p>
            </div>
          </div>
        </div>
        {/* Statistics */}
        <div>
          <h1 className="text-center font-kenia  text-4xl mt-28">Statistics</h1>
          <div>
            <div className="flex flex-col md:flex-row gap-5 my-16">
              {/* one */}
              <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl py-4 shadow-lg font-semibold text-lg">
                <p className="text-5xl font-extrabold text-blue-500">100</p>
                <p>Total Users</p>
              </div>
              {/* two */}
              <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl py-4 shadow-lg font-bold text-lg">
                <p className="text-3xl font-extrabold text-green-500">
                  <span className="text-5xl">90/</span>1000
                </p>
                <progress
                  className="progress progress-success w-56"
                  value="90"
                  max="1000"
                ></progress>
                <p>Get Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Home;
