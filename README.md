# 📧 Email Sender API

A lightweight, self-hosted Email Sender API built with **Node.js**, **Express**, **Multer**, and **Nodemailer** — ideal for backend email delivery via SMTP providers.

This project is divided into two parts:

- **Front-end utility (`email.js`)**
- **Back-end API (Node.js/Express)**

## 🌐 Live Demo

You can use the hosted version of `email.js` directly via CDN in your HTML:

```html
<script src="https://jimboyz-send-mail.vercel.app/v1/email.js"></script>
```

# 📦 Repository Structure

- `front-end/v1/email.js`  
   JavaScript class with a static method to send emails via the back-end API.

- `back-end/server.js`  
   Node.js server using Express, Multer, and Nodemailer to handle email delivery.

# 🚀 Usage

**1. Include the Script**

Add this to your HTML to use the email utility:

```html
<script src="https://jimboyz-send-mail.vercel.app/v1/email.js"></script>
```

**2. HTML Form Example**

```html
<form onsubmit="sendEmail(); return false;">
  <input type="text" id="name" placeholder="Your Name" required />
  <input type="email" id="email" placeholder="Your Email" required />
  <input type="text" id="subject" placeholder="Subject" required />
  <textarea id="message" placeholder="Your Message" required></textarea>
  <input type="file" id="attachment" />
  <button type="submit">Send Email</button>
</form>
```

**3. Send Email via JavaScript**

```JavaScript
function sendEmail() {
    const formData = new FormData();
    formData.append('name', `${document.getElementById('name').value} <${document.getElementById('email').value}>`);
    formData.append('subject', document.getElementById('subject').value);
    formData.append('message', document.getElementById('message').value);
    formData.append('recipient', 'mail@gmail.com'); //Replace with your email
    formData.append('attachment', document.getElementById('attachment').files[0]);

    SMTP.send(formData)
        .then(response => {
            alert(response.message);
            clearInputFields(); // your custom function
        })
        .catch(error => {
            alert('Send failed. Please check the console.');
            console.error(error);
        });
}
```

You can also run `index.html` from the `sample-front-end` directory.

# 📤 How It Works

- `SMTP.send(...)` is a static function that accepts either:
  - JSON data (for text-only emails), or
  - `FormData` (for emails with attachments)
- The data is sent via fetch() to your Node.js API at:

```bash
POST https://jimboyz-email-sender-api.vercel.app/api/send-email
```

- On the backend, the email is processed and sent using Nodemailer.

# ⚙️ Tech Stack

**Front-End**

- JavaScript (Vanilla)

- CDN-based utility (email.js)

**Back-End**

- Node.js

- Express.js

- Multer (for file handling)

- Nodemailer (for SMTP email sending)

# Installation (Back-End)

To run the back-end locally:

```bash
git clone https://github.com/jimboyz-js/email-sender-api.git
cd email-sender-api/back-end
npm install
node server.js
```

### Installation Summary

1. Clone the repository:

```bash
git clone https://github.com/jimboyz-js/email-sender-api.git
cd email-sender-api/back-end
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

or

```bash
npm start
```

By default, the server listens on:  
`http://localhost:3000`

Ensure to update your SMTP credentials in `server.js.`

### 📧 SMTP Configuration (`.env`) _'Create the .env file in the back-end's root directory'_.

Ensure to update your SMTP credentials in your `.env` file before running the server. This is used by `nodemailer` to send emails.

```ini
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_specific_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SECURE=true
SERVICE=gmail
```

> ⚠️ These values correspond to Gmail SMTP settings. If you're using a different provider, adjust accordingly (e.g., smtp.office365.com, smtp.mail.yahoo.com, etc.).

The `server.js` file is set up to use either your provided environment variables or fall back to the following defaults:

```JS
host: host || 'smtp.gmail.com',
port: port || '465',
secure: secure || 'true',
service: service || 'gmail'
```

This means if you do not provide `.env` values, it will attempt to use Gmail’s SMTP settings by default.

✅ Make sure to add the `.env` file in the `back-end/` directory (same level as `server.js`).

# 🧪 Testing Front-End Locally

If you'd like to test the front-end or the email.js script locally, you can serve it using Python’s built-in HTTP server.

1. Navigate to the front-end folder:

```bash
cd ../front-end
```

2. Start a local server (on port 8000):

```bash
# For Python 3.x
python -m http.server 8000

# Or for Windows using py:
py -m http.server 8000
```

To run the server on a specific IP address (e.g., your local network):

```bash
# Specific IP address
py -m http.server --bind 192.168.1.1 8000
```

3. Use local script in your HTML:  
   Update your `<script>` tag in `index.html` like this:

```html
<script src="http://localhost:8000/v1/email.js"></script>
```

4. Run the HTML file:
   Open a browser and go to:

```
http://localhost:8000/sample-front-end/index.html
```

🔁 Make sure your back-end is still running on http://localhost:3000 for full functionality.

# 💡 Inspiration

Inspired by simple JavaScript email utilities like [`smtp.js`](https://smtpjs.com), this project implements similar functionality as a secure backend API rather than a frontend-only script.

# 📄 License

This project is licensed under the MIT License.
