import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string
const uri = process.env.MONGODB_URI || '';

export async function GET(request: Request) {
  let client = null;
  
  try {
    console.log('Connecting to MongoDB to fetch contact messages...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const database = client.db('sarwaStudio');
    const collection = database.collection('contactMessages');
    
    // Get all messages, sorted by creation date (newest first)
    const messages = await collection.find({}).sort({ createdAt: -1 }).toArray();
    console.log(`Found ${messages.length} contact messages`);
    
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error in GET /api/contact/messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}