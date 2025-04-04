import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.categoryName) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required field: categoryName" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, "categories");

    const snapshot = await getDocs(collectionRef);
    const nextId = `c_${String(snapshot.size + 1).padStart(2, "0")}`;

    const docRef = doc(db, "categories", nextId);
    await setDoc(docRef, data);

    return new Response(JSON.stringify({ success: true, id: nextId }), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collectionRef = collection(db, "categories");
    const snapshot = await getDocs(collectionRef);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
