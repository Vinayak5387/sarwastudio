import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection string
const uri = process.env.MONGODB_URI || '';

export async function PUT(
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
    
    // Update the message status to 'read'
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'read' } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error in PUT /api/contact/messages/[id]/read:', error);
    return NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}