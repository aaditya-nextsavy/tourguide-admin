import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET() {
  try {
    const collectionRef = collection(db, "locations");
    const snapshot = await getDocs(collectionRef);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.locationName || !data.title) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required Filed" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, "locations");
    const snapshot = await getDocs(collectionRef);
    const nextId = `l_${String(snapshot.size + 1).padStart(2, "0")}`;

    const docRef = doc(db, "locations", nextId);
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
