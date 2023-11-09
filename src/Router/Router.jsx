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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/requestedFood?foodId=${params.id}`),
      },
      {
        path: "/edit-food/:id",
        element: <EditFood></EditFood>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/availableFood/${params.id}`, {
            credentials: "include",
          }),
      },
    ],
  },
]);

export default Router;
