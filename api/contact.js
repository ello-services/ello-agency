export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the body - handle both JSON and form data
    let body;
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      // Try to parse from raw body
      body = JSON.parse(req.body || '{}');
    }

    console.log('Received body:', JSON.stringify(body, null, 2));

    // Extract fields with multiple possible names
    const name = body.name || body.fullName || body.yourName || '';
    const email = body.email || '';
    const message = body.message || body.details || body.projectDetails || body.project_details || '';
    const phone = body.phone || body.whatsapp || '';
    const business = body.business || '';
    const service = body.service || '';
    const budget = body.budget || '';

    console.log('Extracted fields:', { name, email, message, phone, business, service, budget });

    // Validate required fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required.',
        received: { name, email, message }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Import dependencies
    const mongoose = await import('mongoose');
    const { Resend } = await import('resend');

    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    }

    // Define schema and model
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

    // Save to database
    const newLead = new Lead({ name, email, phone, business, service, budget, message });
    await newLead.save();
    console.log('Lead saved to database:', name);

    // Send email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'Ello Agency <onboarding@resend.dev>',
        to: 'ello.services.org@gmail.com', // Your Resend account email
        subject: `New Lead: ${name} - ${service || 'General Inquiry'}`,
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
      console.log('Email sent successfully');
    } else {
      console.warn('RESEND_API_KEY not found - email not sent');
    }

    return res.status(200).json({ 
      message: 'Success',
      lead: { name, email, service }
    });

  } catch (error) {
    console.error('Backend error:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: error.toString()
    });
  }
}