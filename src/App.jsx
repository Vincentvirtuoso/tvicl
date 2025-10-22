import React from "react";
import Navbar from "./components/layout/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      {!pathname.startsWith("/auth") && <Navbar />}
      <div className="flex flex-col">
        <Outlet />
        {!pathname.startsWith("/auth") && <Footer logo="/images/logo.png" />}
      </div>
    </>
  );
};

export default App;
