import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Home</title>
      </Helmet>
      <div>Home</div>
    </HelmetProvider>
  );
};

export default Home;
