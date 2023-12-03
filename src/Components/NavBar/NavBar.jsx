import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import useAuthData from "../../Hooks/useAuthData/useAuthData";

const NavBar = () => {
  const { user, logOut } = useAuthData();

  return (
    <>
      <Navbar className="mt-3" fluid rounded>
        <Navbar.Brand className="md:mx-auto lg:mx-0">
          <p className="self-center whitespace-nowrap text-3xl dark:text-white font-kenia font-medium ">
            <span>Food</span> For All
          </p>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={user?.photoURL} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium text-red-600">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={logOut}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className=" bg-base-200 md:bg-white p-5 md:p-0 rounded md:rounded-none mt-6 md:mt-0  md:mx-auto lg:mx-0 ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add-food">Add Food</NavLink>
          </li>
          <li>
            <NavLink to="/available-foods">Available Foods</NavLink>
          </li>
          <li>
            <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
          </li>
          <li>
            <NavLink to="/my-food-request">My Food Request</NavLink>
          </li>
          {!user?.email ? (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : (
            <li></li>
          )}
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </>
  );
};

export default NavBar;
