const nodemailer = require('nodemailer');

/**
 * Sends an email using SMTP transport configurations from environment variables.
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} options.text - Plain text fallback body
 */
const sendEmail = async (options) => {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('WARNING: SMTP configuration is missing in environment variables. Email was not sent.');
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587/other
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Connection timeout
    connectionTimeout: 10000, // 10 seconds
  });

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'Wedding RSVP System'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEmail;
