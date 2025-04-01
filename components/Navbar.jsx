import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
  return (
    <section className="navbar-section-wrapper">
      <div className="navbar-wrapper">
        <div className="nav-back-btn">
          {" "}
          <FaArrowLeft />
        </div>
        <div className="nav-heading">
          <p>All tours</p>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
