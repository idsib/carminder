import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, html) {
  try {
    const data = await resend.emails.send({
      from: 'tu_email@tudominio.com',
      to: to,
      subject: subject,
      html: html,
    });

    console.log('Email enviado:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error };
  }
}