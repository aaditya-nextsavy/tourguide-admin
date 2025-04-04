"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

export default function Locations() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations");
        const result = await response.json();

        console.log("API Response:", result);

        if (result.success && Array.isArray(result.data)) {
          setLocations(result.data);
        } else {
          console.error("Invalid API response:", result);
          setLocations([]); 
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  const filteredLocations = locations.filter((location) => {
    const locationName = location.name || location.tourName || location.locationName || "";
    return locationName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  

  if (loading) {
    // return <Loader />;
  }

  return (
    <div className="main-content">
      <Navbar />
      <div className="container">
        <div className="content-information">
          <div className="information-utilities">
            <input
              className="information-searchbox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location"
            />
            <Link href={"/tours/locations/add-location"}>
              <div className="information-add-btn">
              add tour
              </div>
              </Link>
          
          </div>
          <div className="table-wrapper">
            <table className="tour-table">
              <thead className="tours-table-header">
                <tr className="bg-gray-100">
                  <th className="t-first-row">Location ID</th>
                  <th>Cover</th>
                  <th>Location Name</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="tour-table-body">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((item) => (
                    <tr key={item.id}>
                      <td className="t-first-row">{item.id}</td>
                      <td>
                        <Image
                          src={item.image || "/default-image.jpg"}
                          width={50}
                          height={50}
                          alt={item.name || "Location Image"}
                        />
                      </td>
                      <td>{item.name || "N/A"}</td>
                      <td className="t-edit-btns">
                        <span>
                          <HiDotsVertical />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500">
                      No locations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
