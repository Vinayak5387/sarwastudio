import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

// MongoDB connection string
const uri = process.env.MONGODB_URI || '';

export async function POST(request: Request) {
  let client = null;
  
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, services } = body;
    
    // Create a contact message object
    const contactMessage = {
      firstName,
      lastName,
      email,
      phone,
      message,
      services: services || [],
      createdAt: new Date(),
      status: 'new'
    };
    
    // Store the message in MongoDB
    client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('sarwaStudio');
    const collection = database.collection('contactMessages');
    const result = await collection.insertOne(contactMessage);
    
    console.log("Contact message inserted with ID: ", result.insertedId);

    // Send email notification
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_FORM_EMAIL } = process.env;
    
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASSWORD && CONTACT_FORM_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: SMTP_USER,
        to: CONTACT_FORM_EMAIL,
        subject: 'New Contact Form Submission',
        text: `
          Name: ${firstName} ${lastName}
          Email: ${email}
          Phone: ${phone}
          Services: ${services.join(', ')}
          Message: ${message}
        `,
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      messageId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}