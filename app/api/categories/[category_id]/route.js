import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const { category_id } = params;

    if (!category_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Category ID is required" }),
        { status: 400 }
      );
    }

    const docRef = doc(db, "categories", category_id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return new Response(
        JSON.stringify({ success: false, error: "Category not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: { id: snapshot.id, ...snapshot.data() } }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
