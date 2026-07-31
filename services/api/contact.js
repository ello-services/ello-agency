import mongoose from 'mongoose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = client.connection;
  return cachedDb;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // DEBUG: Check what data is actually arriving
  console.log('Form Data Received:', req.body);

  // Accept different possible names for the same field
  const name = req.body.name || req.body.fullName || req.body.yourName;
  const email = req.body.email;
  const message = req.body.message || req.body.details || req.body.projectDetails || req.body.project_details;
  const service = req.body.service;
  const phone = req.body.phone || req.body.whatsapp;
  const business = req.body.business;
  const budget = req.body.budget;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: 'Missing required fields. Check console for details.',
      received: req.body 
    });
  }

  try {
    await connectToDatabase();
    
    const newLead = new Lead({ name, email, phone, business, service, budget, message });
    await newLead.save();

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

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}