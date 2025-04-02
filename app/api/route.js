import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, data } = body; 

    if (!type || !data) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing type or data" }),
        { status: 400 }
      );
    }

    if (!["tours", "locations", "categories"].includes(type)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid type" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, type);

    // Fetch all existing documents to determine the next ID
    const snapshot = await getDocs(collectionRef);
    const nextId = `${type.slice(0, 1)}_${String(snapshot.size + 1).padStart(2, "0")}`; 

    const docRef = doc(db, type, nextId);

    // Save the data with the custom ID
    await setDoc(docRef, data);

    return new Response(
      JSON.stringify({ success: true, id: nextId }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
