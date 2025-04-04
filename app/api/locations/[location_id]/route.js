import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";

export async function GET(req, context) {
  try {
    const { location_id } = context.params;

    if (!location_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Location id is required" }),
        { status: 400 }
      );
    }

    const docRef = doc(db, "locations", location_id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return new Response(
        JSON.stringify({ success: false, error: "Location not found" }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: { id: snapshot.id, ...snapshot.data() },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
