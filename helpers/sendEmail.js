import nodemailer from 'nodemailer';
import 'dotenv/config';

const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport (nodemailerConfig);

const sendEmail = data => {
  const email = {...data, from: UKR_NET_FROM};
  return transport.sendMail (email);
};

// const data = {
//   to: 'korysergey55@gmail.com',
//   subject: 'Verify email',
//   html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click verify email</a>`,
// };

export default sendEmail;
