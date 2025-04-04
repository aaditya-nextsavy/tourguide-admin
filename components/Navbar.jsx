'use client'
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = ({ title, backFlag }) => {
  const router = useRouter();
  const toggleBack =()=>{
    router.back();
  }

  return (
    <section className="navbar-section-wrapper">
      <div className="navbar-wrapper">
        {backFlag && (
          <div className="nav-back-btn"
           onClick={toggleBack}
           >
            <FaArrowLeft />
          </div>
        )}
      
        <div className="nav-heading">
          <p>{title}</p>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
