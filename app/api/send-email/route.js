import { EmailTemplate } from '../../_components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['omareidbalbaa@gmail.com'],
    subject: 'Hello world',
    react: EmailTemplate( 'John' ),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};