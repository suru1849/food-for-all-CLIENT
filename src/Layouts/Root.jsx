import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
