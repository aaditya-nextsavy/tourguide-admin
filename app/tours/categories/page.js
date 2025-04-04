"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";
// import sampleImage from '@'

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t_slug, setSlug] = useState("");
  const [t_name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedData, setFetchedData] = useState("");

  useEffect(() => {
    fetch("/assets/data/getAllTourData.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const result = await response.json();
        if (result.success) {
          console.log("tours:", result.data);
          setFetchedData(result.data);
          console.log("fetched Data :", fetchedData);
          console.log("fetched Data  1 :", fetchedData[0]);
        } else {
          console.error("Error fetching categories:", result.error);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }

    fetchCategories();
    console.log("fetched Data  1 :", fetchedData[0]);
  }, []);


  const router = useRouter();

  const filteredTours = data.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    // return <Loader />;
  }

  return (
    <div className="main-content">
      <Navbar />
      <div className="container">
        <div className="content-information">
          <div className="information-utilities">
            <div>
              <input
                className="information-searchbox"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search tour"
              />
            </div>
            
            <Link href={"/tours/categories/add-category"}>
              <div className="information-add-btn">
              add tour
              </div>
              </Link>
          

          </div>
          <div className="table-wrapper">
            <table className="tour-table">
              <thead className="tours-table-header">
                <tr className="bg-gray-100">
                  <th className="t-first-row"> tour Id</th>
                  <th>Cover</th>
                  <th>tour name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
           
              <tbody className="tour-table-body">
                {fetchedData.length > 0 ? (
                  fetchedData.map((item) => (
                    <tr key={item.id}>
                      <td className="t-first-row">{item.id}</td>
                      {/* Show Firestore ID */}
                      <td>
                        <Image
                          src={item.image || "/default-image.jpg"} 
                          width={50}
                          height={50}
                          alt={item.tourName || "Tour Image"}
                        />
                      </td>
                      <td>{item.tourName || "N/A"}</td>
                      <td>{item.location || "N/A"}</td> 
                      <td>{item.category || "N/A"}</td> 
                      <td className="t-edit-btns">
                        <span>
                          <HiDotsVertical />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500">
                      No tours found
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
