import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASS  
  }
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const templatePath = path.join(__dirname, 'templates', 'otpTemplate.hbs');
  const source = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = handlebars.compile(source);

  const html = compiledTemplate({ otp });

  const mailOptions = {
    from: `"Planificador UNIVALLE" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Código de recuperación de contraseña',
    html
  };

  return transporter.sendMail(mailOptions);
};