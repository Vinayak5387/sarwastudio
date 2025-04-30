import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

// Update the type definition to match Next.js 15.2.1 requirements
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  let client = null;
  const { id } = context.params;

  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Fetching blog with ID:', id);

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    console.log('Connected to MongoDB successfully');

    const database = client.db('sarwaStudio');
    const collection = database.collection('blogs');

    // Fetch the blog by ID
    const blog = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });

  } catch (error) {
    console.error('Error in GET /api/blogs/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Update PUT handler
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  let client = null;
  const { id } = context.params;
  
  try {
    console.log('Attempting to update blog with ID:', id);
    const body = await request.json();
    const { title, content, author, tags, featuredImage } = body;

    // Create a new client
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tls: true,
      tlsAllowInvalidCertificates: false,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    console.log('Connected to MongoDB successfully');

    const database = client.db('sarwaStudio');
    const collection = database.collection('blogs');

    // Prepare update data
    const updateData = {
      $set: {
        ...(title && { title }),
        ...(content && { content }),
        ...(author && { author }),
        ...(tags && { tags }),
        ...(featuredImage && { featuredImage }),
        updatedAt: new Date()
      }
    };

    // Update the blog
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      updateData
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Blog updated successfully'
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Update DELETE handler
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  let client = null;
  const { id } = context.params;
  
  try {
    console.log('Attempting to delete blog with ID:', id);

    // Create a new client
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tls: true,
      tlsAllowInvalidCertificates: false,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    console.log('Connected to MongoDB successfully');

    const database = client.db('sarwaStudio');
    const collection = database.collection('blogs');

    // Delete the blog
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}