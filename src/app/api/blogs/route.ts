import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB connection string
const uri = process.env.MONGODB_URI || '';

// Check if the connection string is valid
if (!uri || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
  console.error('Invalid MongoDB connection string:', uri);
}

export async function GET(request: Request) {
  let client = null;

  try {
    console.log('Attempting to connect to MongoDB...');

    // Create a new client
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database and collection
    const database = client.db('sarwaStudio');
    const collection = database.collection('blogs');

    // Fetch all blogs
    const blogs = await collection.find({}).toArray();
    console.log(`Found ${blogs.length} blogs`);

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}
