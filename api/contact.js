import mongoose from 'mongoose';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define schema outside the handler
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  business: String,
  service: String,
  budget: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create or reuse the model
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
   
    console.log('Received form data:', body);

    // Extract fields
    const { name, email, message, phone, business, service, budget } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email, and message are required.',
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    // Only connect if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    }

    // Save to database
    console.log('Saving lead to database...');
    const newLead = new Lead({
      name,
      email,
      phone: phone || '',
      business: business || '',
      service: service || '',
      budget: budget || '',
      message
    });
   
    await newLead.save();
    console.log('Lead saved successfully');

    // Send email
    if (process.env.RESEND_API_KEY) {
      console.log('Sending email...');
      await resend.emails.send({
        from: 'Ello Agency <onboarding@resend.dev>',
        to: 'ello.services.org@gmail.com',
        subject: `New Lead: ${name} - ${service || 'General'}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #4ade80;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Business:</strong> ${business || 'N/A'}</p>
            <p><strong>Service:</strong> ${service || 'N/A'}</p>
            <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
            <hr/>
            <p><strong>Message:</strong><br/>${message}</p>
          </div>
        `
      });
      console.log('Email sent successfully');
    } else {
      console.warn('RESEND_API_KEY not found - skipping email');
    }

    return res.status(200).json({
      message: 'Success',
      leadId: newLead._id
    });

  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error.stack);
   
    return res.status(500).json({
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
}