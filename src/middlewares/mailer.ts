import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
import Mailgen from 'mailgen';

export const sendTestEmail = async () => {
  let config = {
    sevice: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Successfully Register with us.', // plain text body
    html: '<b>Successfully Register with us.</b>', // html body
  };

  try {
    // Try sending email
    transporter.sendMail(message).then((info) => {
      const emailResponsePyload = {
        msg: 'you should receive an email',
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      };
      console.log(emailResponsePyload);
      return emailResponsePyload;
    });
  } catch (error) {
    return error;
  }
};

/** send mail from real gmail account */
export const sendEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.body;

  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
    // service: 'gmail',
    connectionTimeout: 5 * 60 * 1000, // 5 min
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/',
      logo: 'https://mailgen.js/img/logo.png',
      logoHeight: '30px',
    },
  });

  const response = {
    body: {
      name: 'John Appleseed',
      intro:
        'You have received this email because a password reset request for your account was received.',
      action: {
        instructions: 'Click the button below to reset your password:',
        button: {
          color: '#DC4D2F',
          text: 'Reset your password',
          link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010',
        },
      },
      outro:
        'If you did not request a password reset, no further action is required on your part.',
    },
  };

  // Generate an HTML email with the provided contents
  const emailBody = await mailGenerator.generate(response);

  const message = {
    from: EMAIL,
    // to: userEmail,
    // to: 'kaweli8647@notedns.com',
    to: EMAIL,
    subject: 'Reset Password',
    html: emailBody,
  };

  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      const emailResponsePyload = {
        msg: 'you should receive an email',
        info: info.messageId,
        // preview: nodemailer.getTestMessageUrl(info),
      };
      return emailResponsePyload;
    }
  });

  // Try sending email
  // transporter.sendMail(message).then((info) => {
  //   const emailResponsePyload = {
  //     msg: 'you should receive an email',
  //     info: info.messageId,
  //     preview: nodemailer.getTestMessageUrl(info),
  //   };
  //   console.log(emailResponsePyload);
  //   return emailResponsePyload;
  // });
};
