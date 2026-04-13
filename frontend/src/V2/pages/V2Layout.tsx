import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import "../v2.css"




function V2Layout() {
  return (
    <div className="v2">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default V2Layout;