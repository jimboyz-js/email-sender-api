import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Needed for multer to parse form-data
  },
};

const upload = multer({ dest: '/tmp' }); // Vercel only allows temp dir

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await runMiddleware(req, res, upload.single('attachment'));

  const { name, recipient, subject, message } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SECURE === 'true',
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: name,
    to: recipient || process.env.RECIPIENTS_EMAIL,
    subject: subject || `Message from ${name}`,
    text: `From: ${name}\n${message}`,
    attachments: file
      ? [{ path: file.path, filename: file.originalname }]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    if (file) fs.unlinkSync(file.path);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    if (file) fs.unlinkSync(file.path);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
