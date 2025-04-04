import { db } from "@/lib/firebase";
import {  collection, getDocs, query, orderBy, limit, doc, setDoc  } from "firebase/firestore";

export async function GET() {
  try {
    const collectionRef = collection(db, "tours");
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

    if (!data.tourName || !data.title) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const collectionRef = collection(db, "tours");

    const q = query(collectionRef, orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);

    let lastIdNumber = 0;

    if (!snapshot.empty) {
      const lastDoc = snapshot.docs[0];
      const lastId = lastDoc.id; 
      lastIdNumber = parseInt(lastId.split("_")[1], 10); 
    }

    const nextId = `t_${String(lastIdNumber + 1).padStart(2, "0")}`;

    const docRef = doc(db, "tours", nextId);
    await setDoc(docRef, { ...data, id: nextId });

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