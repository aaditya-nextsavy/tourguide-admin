import { db } from '../../../lib/firebase';

export async function DELETE(request) {
  const { id } = await request.json(); 
  
  try {
    await db.collection('your-collection').doc(id).delete(); 
    return new Response(JSON.stringify({ success: true, message: 'Data deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
