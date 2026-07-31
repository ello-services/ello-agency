import mongoose from 'mongoose';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Define Database Schema
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

// Prevent multiple connections in serverless environment
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = client.connection;
    return cachedDb;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to database");
  }
}

// 2. The API Handler
export default async function handler(req, res) {
  // Allow CORS for local testing if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message, service, phone, business, budget } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Connect to DB and Save
    await connectToDatabase();
    const newLead = new Lead({ name, email, phone, business, service, budget, message });
    await newLead.save();
    console.log("Lead saved to database:", name);

    // Send Email Notification
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Ello Agency <onboarding@resend.dev>', 
        to: 'hello@ello.dev', // CHANGE THIS to your actual email!
        subject: `New Lead: ${name} - ${service || 'General'}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4;">
            <h2 style="color: #4ade80;">New Contact Form Submission</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Business:</strong> ${business || 'N/A'}</p>
              <p><strong>Service:</strong> ${service || 'N/A'}</p>
              <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
              <hr/>
              <p><strong>Message:</strong><br/>${message}</p>
            </div>
          </div>
        `
      });
      console.log("Email sent successfully");
    } else {
      console.warn("RESEND_API_KEY is missing. Email not sent.");
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Backend API Error:', error);
    // Return JSON even on error so frontend doesn't crash
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}