import { Link, NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi";
import "./Dashboard.css";
import { useState } from "react";

const Dashboard = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      <div className="block lg:hidden">
        <div className="px-2 flex items-center gap-2">
          {!sideBar ? (
            <GiHamburgerMenu onClick={() => setSideBar(!sideBar)} size={24} />
          ) : (
            <GiCrossMark onClick={() => setSideBar(!sideBar)} size={24} />
          )}

          <h1 className="text-3xl text-orange-400 font-bold">Dashboard</h1>
        </div>
      </div>
      <div className="p-3 flex bg-gradient-to-r from-[#DCD9C6] to-[#87BA9E] min-h-screen">
        {/* navigator */}
        <div
          className={`border-r-[1px] pr-3 ${
            !sideBar
              ? "hidden"
              : "block z-10 absolute bg-gray-300 h-full top-9 left-0"
          } lg:block`}
        >
          <Link
            to="/"
            className="text-orange-400 text-3xl font-bold hidden lg:block"
          >
            Dashboard
          </Link>
          <ul id="dashboard">
            <li>
              <NavLink
                to="user"
                className={({ isActive }) => (isActive ? "dashboard" : "")}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="availableFoods"
                className={({ isActive }) => (isActive ? "dashboard" : "")}
              >
                Available Food
              </NavLink>
            </li>
            <li>
              <NavLink
                to="moneyDonations"
                className={({ isActive }) => (isActive ? "dashboard" : "")}
              >
                R. Donations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="monetaryDonations"
                className={({ isActive }) => (isActive ? "dashboard" : "")}
              >
                D. Donations
              </NavLink>
            </li>
          </ul>
        </div>
        {/* navigating pages */}
        <div className="lg:pl-3 w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
