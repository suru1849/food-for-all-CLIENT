import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar className="mt-3" fluid rounded>
      <Navbar.Brand>
        <p className="self-center whitespace-nowrap text-3xl dark:text-white font-kenia font-medium">
          <span>Food</span> For All
        </p>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className=" bg-base-200 md:bg-white p-5 md:p-0 rounded md:rounded-none mt-6 md:mt-0">
        <li>
          <NavLink to="/">Home</NavLink>
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
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
