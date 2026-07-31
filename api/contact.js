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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    console.log('Received:', { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required.',
        received: { name, email, message }
      });
    }

    await mongoose.connect(process.env.MONGODB_URI);
    
    const newLead = new Lead({ ...req.body });
    await newLead.save();

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Ello Agency <onboarding@resend.dev>',
        to: 'ello.services.org@gmail.com',
        subject: `New Lead: ${name}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
      });
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: error.message });
  }
}