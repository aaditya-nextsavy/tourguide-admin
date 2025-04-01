import { db, collection, getDocs } from "@/lib/firebase";

console.log(collection, getDocs);

export async function GET() {
  try {
    const toursCollection = collection(db, "tours");

    const snapshot = await getDocs(toursCollection);

    const tours = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(tours), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
