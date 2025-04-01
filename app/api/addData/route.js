import { db } from '../../../lib/firebase';

export async function POST(request) {
  const { data } = await request.json(); 
  
  try {
    const docRef = await db.collection('your-collection').add(data);
    return new Response(JSON.stringify({ success: true, docRef }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
