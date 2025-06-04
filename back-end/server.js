/*
 *
 * Send an email by calling the backend API.
 * @author jimBoYz Ni ChOy!!!
 * May 26, 2025 Mon. 5:30 PM
 * Updated June 03, 2025 Tue. 4:41PM
 * @param {Object} options - email options: { name, recipient (to), subject, message (body) }
 * 
 */

import dotenv from 'dotenv';
import multer from "multer";
import nodemailer from 'nodemailer';
import express from "express";
import cors from 'cors';
import fs from 'fs';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Multer setup
const destination = multer({dest: './uploads'});

let dStorage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({
    storage:dStorage
});

const user_mail = process.env.EMAIL_USER;
const email_pass = process.env.EMAIL_PASS;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const secure = process.env.SECURE;
const service = process.env.SERVICE;

app.post('/send-email', upload.single('attachment'), async (req, res) => {
    try {

        const {name, recipient, subject, message} = req.body;
        const file = req.file;

        const emailSubject = subject || `Message from ${name}`;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            service,
            auth: {
                user:user_mail,
                pass:email_pass
            }
        })

        const mailOptions = {
            from: name,
            to: recipient,
            subject: emailSubject,
            text: `From: ${name} \n${message}`,
            attachments: file ? [{ path: file.path, filename: file.originalname }] : [],
        };

        await transporter.sendMail(mailOptions);
        if (file) fs.unlinkSync(file.path);
        res.status(200).json({success: true, message: 'Email sent successfully!'})

    } catch(err) {
        console.error(err);
        if (file) fs.unlinkSync(file.path);
        res.status(500).json({error: 'Failed to send email.'});
    }
})

app.listen(3000, ()=> {
    console.log('Server is listening on port 3000');
})