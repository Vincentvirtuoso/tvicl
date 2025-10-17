import React from "react";
import Navbar from "./components/layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="flex flex-col">
        <Outlet />
        <Footer logo="/images/logo.png" />
      </div>
    </>
  );
};

export default App;
