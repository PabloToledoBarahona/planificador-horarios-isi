import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const templatePath = path.join(__dirname, '../utils/email/templates/otpTemplate.hbs');
  const source = fs.readFileSync(templatePath, 'utf8');
  const compiled = handlebars.compile(source);

  const html = compiled({ otp });

  const mailOptions = {
    from: `"Planificador UNIVALLE" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Código de recuperación de contraseña',
    html
  };

  return transporter.sendMail(mailOptions);
};