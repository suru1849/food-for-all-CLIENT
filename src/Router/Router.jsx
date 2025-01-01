import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import Error from "../Pages/Error/Error";
import AddFood from "../Pages/AddFood/AddFood";
import AvailableFoods from "../Pages/AvailableFoods/AvailableFoods";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import ManageMyFoods from "../Pages/ManageMyFoods/ManageMyFoods/ManageMyFoods";
import Private from "../Private/Private";
import MyFoodReq from "../Pages/MyFoodReq/MyFoodReq";
import ManageFood from "../Pages/ManageFood/ManageFood";
import EditFood from "../Pages/EditFood/EditFood";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Users from "../Pages/Dashboard/rigthSidePages/Users";
import DeliveredFoods from "../Pages/Dashboard/rigthSidePages/DeliveredFoods";
import AvailableFood from "../Pages/Dashboard/rigthSidePages/AvailableFood";
import DashboardWelcome from "../Pages/Dashboard/rigthSidePages/DashboardWelcome";
import DonateMoney from "../Pages/DonateMoney/DonateMoney";
import MoneyDonations from "../Pages/Dashboard/rigthSidePages/MoneyDonations";
import DDonations from "../Pages/Dashboard/rigthSidePages/DDonations";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-food",
        element: (
          <Private>
            <AddFood></AddFood>
          </Private>
        ),
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/manage-my-foods",
        element: (
          <Private>
            <ManageMyFoods></ManageMyFoods>
          </Private>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <Private>
            <MyFoodReq></MyFoodReq>
          </Private>
        ),
      },
      // new page added here
      {
        path: "/donate-money",
        element: (
          <Private>
            <DonateMoney></DonateMoney>
          </Private>
        ),
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/food-details/:id",
        element: (
          <Private>
            <FoodDetails></FoodDetails>
          </Private>
        ),
      },
      {
        path: "/manage-food/:id",
        element: <ManageFood></ManageFood>,
      },
      {
        path: "/edit-food/:id",
        element: <EditFood></EditFood>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: <DashboardWelcome></DashboardWelcome>,
      },
      {
        path: "user",
        element: <Users></Users>,
      },
      {
        path: "availableFoods",
        element: <AvailableFood></AvailableFood>,
      },
      {
        path: "deliveredFood",
        element: <DeliveredFoods></DeliveredFoods>,
      },
      {
        path: "moneyDonations",
        element: <MoneyDonations />,
      },
      {
        path: "monetaryDonations",
        element: <DDonations />,
      },
    ],
  },
]);

export default Router;
