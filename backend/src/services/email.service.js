import nodemailer from "nodemailer";
import { EMAIL_APP_PASSWORD, EMAIL_USER } from "../utils/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({
  hrEmail,
  subject,
  body,
  pdfBuffer,
  originalName,
}) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: hrEmail,
    subject: subject,
    text: body,
    attachments: [
      {
        filename: originalName || "resume.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };
  const result = await transporter.sendMail(mailOptions);
  return result;
};
