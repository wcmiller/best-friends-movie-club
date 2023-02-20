import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export default function sendEmail(subject, html, text, recipients, inReplyTo = false){
  const to = recipients.map(recipient => `${recipient.name} <${recipient.email}>`).join(', ');
  return new Promise((resolve, reject) => {
    transport.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: 'Warren <wcameronmiller@gmail.com>',
      subject,
      text,
      html,
      inReplyTo
    }, (err, info) => {
      if(err){ 
        reject(err);
      } else { 
        resolve(info) 
      }
    });  
  });
}