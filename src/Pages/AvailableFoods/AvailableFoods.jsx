import axios from "axios";
import { useEffect, useState } from "react";
import AvailableFoodCard from "./AvailableFoodCard";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sort, setSort] = useState(0);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/availableFood?name=${searchItem}&Sort=${sort}&email`
      )
      .then((res) => setFoods(res.data));
  }, [searchItem, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    e.target.reset();

    setSearchItem(name);
  };

  const hanldeSort = (e) => {
    e.preventDefault();

    if (e.target.value === "1") {
      setSort(1);
    } else {
      setSort(0);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Food For All | Available Food</title>
      </Helmet>
      <div className=" md:w-3/4 mx-auto mt-8">
        <form onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search foods by name"
            />
            <input
              type="submit"
              value="Search"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          </div>
        </form>
      </div>

      {/* foods */}
      {foods?.length > 0 ? (
        <>
          <div className="w-1/2 md:w-[25%] mt-10 mb-5">
            <label
              htmlFor="countries"
              className="block mb-2 font-bold text-sm  text-gray-900 dark:text-white"
            >
              Sort By
            </label>
            <select
              id="countries"
              onChange={hanldeSort}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">Default</option>
              <option value="1">Expired Date/Time</option>
            </select>
          </div>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-14">
            {foods.map((food) => (
              <AvailableFoodCard key={food._id} food={food}></AvailableFoodCard>
            ))}
          </div>
        </>
      ) : (
        <div className="text-xl md:text-2xl min-h-[80vh] text-red-600 font-semibold  flex justify-center items-center">
          No Data Found, Please refresh
        </div>
      )}
    </HelmetProvider>
  );
};

export default AvailableFoods;
