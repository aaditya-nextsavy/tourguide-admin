"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t_slug, setSlug] = useState("");
  const [t_name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/assets/data/getAllTourData.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // useEffect(() => {
  //   const fetchTourDetails = async () => {
  //     try {
  //       const response = await fetch("./api/getData/");
  //       const result = await response.json();
  //       setTours(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error while fetching tours: ", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchTourDetails();
  // }, []);

  const router = useRouter();
  
  const filteredTours = data.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main-content">
      <Navbar />
      <div className="container">
        <div className="content-information">
          <div className="information-utilities">
            <div>
             
              <input  className="information-searchbox"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search tour"

              />
              
              </div>
            <div className="information-add-btn">add tour</div>
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
              {/* <tbody className="tour-table-body">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="t-first-row">{item.id}</td>
                    <td>
                      <Image
                        src={item.image}
                        width={50}
                        height={50}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.category}</td>

                    <td className="t-edit-btns">
                      <span>
                        <HiDotsVertical />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody> */}
              <tbody className="tour-table-body">
                {filteredTours.length > 0 ? (
                  filteredTours.map((item) => (
                    <tr key={item.id}>
                      <td className="t-first-row">{item.id}</td>
                      <td>
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{item.category}</td>

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
                      No matching tours found
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
