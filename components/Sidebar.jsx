import { useState } from "react";
import Link from "next/link";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";



export default function Sidebar() {
  const [isToursOpen, setIsToursOpen] = useState(false);

  const toggleTours = () => {
    setIsToursOpen(!isToursOpen);
  };

  return (
    <section className="sidebar-wrapper text-white h-screen">
      <p className="tourguide-header">tourguide</p>
      <ul>
        {/* Tours Section with Accordion */}
        <li className="mb-4">
          <div onClick={toggleTours} className="flex items-center cursor-pointer">
            <span className="mr-2">Tours</span>
            <span>{isToursOpen ? <FaCaretUp /> : <FaCaretDown/>}</span>
          </div>
          {isToursOpen && (
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <Link href="/tours/all-tours" className="hover:text-gray-300">
                  All tours
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/tours/categories" className="hover:text-gray-300">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/tours/locations" className="hover:text-gray-300">
                  Locations
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Users Section */}
        <li className="mb-4">
          <Link href="/users" className="hover:text-gray-300">
            Users
          </Link>
        </li>

        {/* Settings Section */}
        <li className="mb-4">
          <Link href="/settings" className="hover:text-gray-300">
            Settings
          </Link>
        </li>
      </ul>
    </section>
  );
}
