import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer"
import Navbar from "../components/Layout/Navbar"
import "../v1.css"


function V1Layout() {
  return (
    <div className="v1">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default V1Layout;