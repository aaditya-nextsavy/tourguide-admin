import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing type in query params" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, type);
    const snapshot = await getDocs(collectionRef);

    const data = snapshot.docs.map(doc => ({
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
