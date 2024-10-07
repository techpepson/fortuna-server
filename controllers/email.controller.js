import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();
// Controller function to handle client consultation email
export const sendClientConsultation = async (req, res) => {
  const { name, email, phone, description, editedResponse } = req.body;

  // Email validation and basic error handling
  if (!name || !email || !phone || !description || !editedResponse) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      port: 567, // You can use other services like Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address (environment variable)
        pass: process.env.EMAIL_PASS, // Your email password or app password (environment variable)
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender email
      to: process.env.EMAIL_USER, // Your firm's email address (or multiple recipients)
      subject: "New Client Consultation Request",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
      <h2 style="color: #4CAF50; text-align: center;">New Consultation Request</h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 16px;"><strong>Interested Practice Area:</strong> ${editedResponse}</p>
        <p style="font-size: 16px;"><strong>Case Description:</strong></p>
        <p style="padding: 10px; background-color: #f0f0f0; border-radius: 5px;">${description}</p>
      </div>
      <footer style="text-align: center; margin-top: 20px;">
        <p style="color: #888; font-size: 14px;">Fortuna Legal Services</p>
        <p style="color: #888; font-size: 14px;">50 Raffles Place L19 & L30, Singapore, 048623</p>
        <p style="color: #888; font-size: 14px;">Contact us at: +233123456789 | <a href="mailto:fortuna-legal@gmail.com" style="color: #4CAF50;">fortuna-legal@gmail.com</a></p>
      </footer>
    </div>
  `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // If the email is successfully sent
    return res
      .status(200)
      .json({ message: "Consultation request sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send consultation request." });
  }
};
