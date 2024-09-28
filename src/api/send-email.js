import { sendEmail } from '../../emailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, html } = req.body;

    const result = await sendEmail(to, subject, html);

    if (result.success) {
      res.status(200).json({ message: 'Email enviado con éxito' });
    } else {
      res.status(500).json({ message: 'Error al enviar el email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}