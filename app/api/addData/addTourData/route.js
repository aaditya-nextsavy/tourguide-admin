


// import { db, collection } from "@/lib/firebase";
// import { addDoc } from "firebase/firestore"; 

// export async function POST(req) {
//   try {
//     const body = await req.json(); 

//     if (!body.tourName || !body.title) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     // Save the exact data received from frontend
//     const docRef = await addDoc(collection(db, "tours"), body);

//     return new Response(
//       JSON.stringify({ success: true, id: docRef.id }),
//       { status: 201 }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.tourName || !body.title) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const toursCollection = collection(db, "tours");

    const snapshot = await getDocs(toursCollection);
    const nextId = `t_${String(snapshot.size + 1).padStart(2, "0")}`; 

    const tourDocRef = doc(db, "tours", nextId); 

    await setDoc(tourDocRef, body);

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
