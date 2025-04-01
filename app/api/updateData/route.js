import { db } from '../../../lib/firebase';

export async function PUT(request) {
  const { id, updatedData } = await request.json(); // Get document ID and data from the request body
  
  try {
    await db.collection('your-collection').doc(id).update(updatedData); // Update document in Firestore
    return new Response(JSON.stringify({ success: true, message: 'Data updated successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
