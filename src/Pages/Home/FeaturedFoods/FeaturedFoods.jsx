import { useEffect, useState } from "react";
import AvailableFoodCard from "../../AvailableFoods/AvailableFoodCard";
import { Link } from "react-router-dom";
import { getFoodSortedByQNT } from "../../../api/food";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoodSortedByQNT().then((data) => {
      console.log(data);
      setFoods(data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center font-kenia  text-4xl mt-28">Featured Foods</h1>
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
  );
};

export default FeaturedFoods;
