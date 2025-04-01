"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch("./api/getData/");
        const result = await response.json();
        setTours(result);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching tours: ", error);
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, []);

  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main-content">
      <Navbar />
      <div className="container">
        <div className="content-information">
          <h1 className="text-3xl font-bold text-center">All tours</h1>

          <div></div>
        </div>
      </div>
    </div>
  );
}
