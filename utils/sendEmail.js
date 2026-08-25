const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const nodemailer = require('nodemailer');

console.log('SMTP USER:', process.env.SMTP_USER);
console.log('SMTP PASS EXISTS:', !!process.env.SMTP_PASS);
console.log('SMTP PASS LENGTH:', process.env.SMTP_PASS?.length);

const sendEmail = async (options) => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.warn(
      'WARNING: SMTP configuration is missing in environment variables. Email was not sent.'
    );
    return null;
  }

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  family: 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  // no tls override — let nodemailer derive SNI from `host`
});

  try {
    await transporter.verify();
    console.log('SMTP CONNECTION SUCCESS');
  } catch (error) {
    console.error('SMTP VERIFY ERROR:', error);
    throw error;
  }

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'Wedding RSVP System'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log('EMAIL SENT SUCCESSFULLY:', {
      messageId: info.messageId,
      response: info.response,
    });

    return info;
  } catch (error) {
    console.error('EMAIL SEND ERROR:', error);
    throw error;
  }
};

module.exports = sendEmail;