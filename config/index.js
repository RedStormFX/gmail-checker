require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  gmailEmail: process.env.GMAIL_EMAIL,
  gmailPassword: process.env.GMAIL_PASSWORD,
};

module.exports = { config };
