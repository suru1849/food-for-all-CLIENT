import donationImg from "../../../assets/top-view-food-donation-box.jpg";

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${donationImg})` }}
      className="bg-cover h-[50vh] 00  rounded-lg  my-6 flex justify-center items-center text-center"
    >
      <div className="bg-black w-full h-full bg-opacity-50 flex justify-center items-center rounded-lg">
        <div>
          <h1 className="text-2xl md:text-5xl text-amber-400 font-extralight">
            #Share Food, share happiness
          </h1>
          <p className="text-base md:text-2xl text-base-300 font-bold">
            sign-in/log-in to be the part of happiness sharing family
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
