// api/contact.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, service, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // TODO: 1. Save to Database (We will add this in Phase 2)
    // await db.collection('leads').insertOne({ name, email, service, message, date: new Date() });

    // TODO: 2. Send Email (We will use Resend or Nodemailer here)
    // await sendEmail({ to: 'hello@ello.dev', subject: `New Lead: ${name}`, text: message });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}