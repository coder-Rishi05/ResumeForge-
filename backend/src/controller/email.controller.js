import { sendEmail } from "../services/email.service.js";

export const sendEmailController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume PDF is required. Please attach a PDF file.",
    });
  }

  const { to, subject, body, applicantName } = req.body;

  if (!to) {
    return res.status(400).json({
      success: false,
      message: "Recipient email (to) is required.",
    });
  }

  if (!subject) {
    return res.status(400).json({
      success: false,
      message: "Email subject is required.",
    });
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      message: "Email body is required.",
    });
  }

  const pdfBuffer = req.file.buffer;

  const pdfFileName = req.file.originalname  || "resume.pdf";

  try {
    await sendEmail({
      hrEmail: to, // to → hrEmail
      subject,
      body, // text nahi, body
      pdfBuffer, // alag se pass karo
      originalName: req.file.originalname , // lowercase 'n' — next bug dekho
    });
    return res.status(200).json({
      success: true,
      message: `Email successfully sent to ${to}`,
      // Debug info — Phase 3 mein yahan AI metadata bhi add karenge
      meta: {
        recipient: to,
        subject,
        applicantName: applicantName || "Not provided",
        attachedFile: pdfFileName,
        fileSize: `${(pdfBuffer.length / 1024).toFixed(2)} KB`,
      },
    });
  } catch (error) {
    console.error("Email sending failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please check server logs.",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
