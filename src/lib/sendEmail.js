import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: Number(import.meta.env.SMTP_PORT),
  secure: false,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

// Send an email
export async function sendContactEmail({name, email, message}) {

  return transporter.sendMail({

    from: import.meta.env.MAIL_NOTIFICATIONS,
    to: import.meta.env.MAIL_TO,
    replyTo: email,
    subject: `Nuevo contacto en web: ${name}`,
    text: `Nombre: ${name}, Email: ${email},
      Mensaje:
      ${message}
      `,
  });
}