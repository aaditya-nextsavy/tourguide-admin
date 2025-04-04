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
import sampleImage from "../../../public/assets/media/trending-city/london-video.png";
export default function Tours() {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch("/api/tours");
        const result = await response.json();
        if (result.success) {
          setFetchedData(result.data || []);
          setLoading(false);
        } else {
          console.error("Error fetching tours:", result.error);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchTours();
  }, []);

  const router = useRouter();

  const safeSearchQuery = searchQuery?.toLowerCase() || "";

  const filteredTours = fetchedData.filter((tour) => {
    const query = searchQuery.toLowerCase();
    return (
      (tour?.tourName && tour.tourName.toLowerCase().includes(query)) ||
      (tour?.category && tour.category.toLowerCase().includes(query)) ||
      (tour?.id && tour.id.toLowerCase().includes(query)) ||
      (tour?.location && tour.location.toLowerCase().includes(query))
    );
  });

  // if (loading) return <Loader />;

  return (
    <div className="main-content">
      <Navbar title="All Tours" backFlag={false} />

      <div className="container">
        <div className="content-information">
          <div className="information-utilities">
            <input
              className="information-searchbox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tour"
            />
            <Link href={"/tours/all-tours/add-tour"}>
              <div className="information-add-btn">Add Tour</div>
            </Link>
          </div>

          <div className="table-wrapper">
            <table className="tour-table">
              <thead className="tours-table-header">
                <tr className="bg-gray-100">
                  <th className="t-first-row">Tour ID</th>
                  <th>Cover</th>
                  <th>Tour Name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="tour-table-body">
                {filteredTours.length > 0 ? (
                  filteredTours.map((item) => (
                    <tr key={item.id}>
                      <td className="t-first-row">{item.id}</td>
                      <td>
                        {typeof item.image === "string" &&
                        item.image.trim() !== "" ? (
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt="Tour Image"
                          />
                        ) : (
                          <Image
                            src="/assets/media/trending-city/london-video.png"
                            width={50}
                            height={50}
                            alt="Default Image"
                          />
                        )}
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
