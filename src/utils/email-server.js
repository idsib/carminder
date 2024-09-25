// email-server.js
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }

  client.query('LISTEN send_email');

  client.on('notification', async (msg) => {
    if (msg.channel === 'send_email') {
      const emailData = JSON.parse(msg.payload);
      
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      try {
        await transporter.sendMail({
          from: '"Carminder" <noreply@carminder.com>',
          to: emailData.to,
          subject: emailData.subject,
          text: emailData.body,
          html: `<p>${emailData.body}</p>`
        });
        console.log('Verification email sent');
      } catch (error) {
        console.error('Error sending email', error);
      }
    }
  });
});