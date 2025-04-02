import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing type in query params" }),
        { status: 400 }
      );
    }

    const data = await req.json(); 

    console.log("Received Type:", type);
    console.log("Received Data:", data);

    if (type === "tours" && (!data.tourName || !data.title)) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields for tours" }),
        { status: 400 }
      );
    }

    if (type === "locations" && !data.locationName) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields for locations" }),
        { status: 400 }
      );
    }

    if (type === "categories" && !data.categoryName) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields for categories" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, type); 

    const snapshot = await getDocs(collectionRef);
    const prefix = type.charAt(0).toLowerCase(); 
    const nextId = `${prefix}_${String(snapshot.size + 1).padStart(2, "0")}`;

    const docRef = doc(db, type, nextId);

    await setDoc(docRef, data);

    return new Response(JSON.stringify({ success: true, id: nextId }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
