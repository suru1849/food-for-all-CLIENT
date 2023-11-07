import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import Error from "../Pages/Error/Error";

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
        path: "/available-foods",
        element: <div>available-foods</div>,
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
    ],
  },
]);

export default Router;
