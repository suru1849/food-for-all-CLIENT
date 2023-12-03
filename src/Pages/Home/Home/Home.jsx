import { Helmet, HelmetProvider } from "react-helmet-async";
import img1 from "../../../assets/image1.png";
import img2 from "../../../assets/image2.png";
import img3 from "../../../assets/image5.png";
import Banner from "../Banner/Banner";
import FeaturedFoods from "../FeaturedFoods/FeaturedFoods";
import { useEffect, useState } from "react";
import { getStatistics } from "../../../api/statistics";

const Home = () => {
  const [statictic, setStatistics] = useState({});

  useEffect(() => {
    getStatistics().then((data) => setStatistics(data));
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Home</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <div>
        {/* our servuces */}
        <div>
          <h1 className="text-center font-kenia  text-4xl mt-28">
            Our Services
          </h1>
          <div className="flex flex-col md:flex-row gap-5 my-16">
            {/* one */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg hover:scale-105 transition">
              <img className="w-56" src={img1} />
              <p>Best Service Promise</p>
            </div>
            {/* two */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg hover:scale-105 transition">
              <img className="w-56" src={img2} />
              <p>Fullfill Your Needs</p>
            </div>
            {/* Three */}
            <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl p-2 shadow-lg font-bold text-lg hover:scale-105 transition">
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
              <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl py-4 shadow-lg font-semibold text-lg hover:scale-105 transition">
                <p className="text-5xl font-extrabold text-blue-500">
                  {statictic?.users}
                </p>
                <p>Total Users</p>
              </div>
              {/* two */}
              <div className="flex flex-col justify-center items-center gap-3 border-2 md:w-1/2 rounded-xl py-4 shadow-lg font-bold text-lg hover:scale-105 transition">
                <p className="text-3xl font-extrabold text-green-500">
                  <span className="text-5xl">{statictic?.getService}/</span>
                  {statictic?.users}
                </p>
                <progress
                  className="progress progress-success w-56"
                  value={statictic?.getService}
                  max={statictic?.users}
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
