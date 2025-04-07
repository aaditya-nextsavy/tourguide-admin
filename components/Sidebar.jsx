"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";


export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path) => {
    const isActive = pathname === path;
    return `sidebar-link ${isActive ? "active" : ""}`;
  };

  return (
    <section className="sidebar-wrapper">
      <p className="tourguide-header">tourguide</p>
      <ul className="sidebar-menu">
        <li className={getLinkClasses("/tours/all-tours")}>
          <Link href="/tours/all-tours">
            <MdTour className="icon" /> All tours
          </Link>
        </li>

        <li className={getLinkClasses("/tours/categories")}>
          <Link href="/tours/categories">
          <MdCategory className="icon" /> Categories</Link>
        </li>

        <li className={getLinkClasses("/tours/locations")}>
          <Link href="/tours/locations">
          <FaLocationDot className="icon" />Locations</Link>
        </li>
      </ul>
    </section>
  );
}
