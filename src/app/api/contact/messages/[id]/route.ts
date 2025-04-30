import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection string
const uri = process.env.MONGODB_URI || '';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let client = null;
  
  try {
    const id = params.id;
    
    client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('sarwaStudio');
    const collection = database.collection('contactMessages');
    
    // Find the message by ID
    const message = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error in GET /api/contact/messages/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch message' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}