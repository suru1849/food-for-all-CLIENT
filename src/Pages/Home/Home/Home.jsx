import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Home</title>
      </Helmet>
      <div>
        <div className="bg-addFoodBanner bg-center h-[50vh] rounded-lg  my-6 flex justify-center items-center text-center">
          <div>
            <h1 className="text-2xl md:text-5xl text-white font-extralight">
              #Share Food, share happiness
            </h1>
            <p className="text-base md:text-2xl text-base-300 font-bold">
              sign-in/log-in to be the part of happiness sharing family
            </p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Home;
