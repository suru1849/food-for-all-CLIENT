import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        element: <div>login</div>,
      },
    ],
  },
]);

export default Router;
