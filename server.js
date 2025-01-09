const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { email, chartDataUrl } = req.body;

  // Input validation
  if (!email || !chartDataUrl) {
    return res.status(400).send("Email and chartDataUrl are required.");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.RESEND_USER, // Use environment variable for user
      pass: process.env.RESEND_PASS, // Use environment variable for password
    },
  });

  const mailOptions = {
    from: process.env.RESEND_USER,
    to: email,
    subject: "Your Chart Data",
    text: "Please find your chart data attached.",
    attachments: [
      {
        filename: "chart.png",
        path: chartDataUrl,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.message);
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
