"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Home() {
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

  const toggleSignOut = async () => {
    await signOut(auth);
    router.replace("/login");
    router.refresh();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        Welcome to Admin Dashboard
      </h1>
      
      <div>
        <button className="w-20 h-6 bg-red-400 rounded" onClick={toggleSignOut}>
          Logout
        </button>
      </div>
      <div>
        <h1>Our Tours</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div key={tour.id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{tour.name}</h2>
              <p>
                <strong>Location:</strong> {tour.location}
              </p>
              <p>
                <strong>Days:</strong> {tour.days}
              </p>
              <p>
                <strong>Number of Persons:</strong> {tour.number_of_person}
              </p>
              <p>
                <strong>Types:</strong> {tour.for.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
