import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import Error from "../Pages/Error/Error";
import AddFood from "../Pages/AddFood/AddFood";
import AvailableFoods from "../Pages/AvailableFoods/AvailableFoods";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";

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
        element: <AddFood></AddFood>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/manage-my-foods",
        element: <div>manage-my-foods</div>,
      },
      {
        path: "/my-food-request",
        element: <div>my-food-request</div>,
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
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/availableFood?id=${params.id}`),
      },
    ],
  },
]);

export default Router;
