const express = require("express");
const GmailChecker = require("./GmailChecker");
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/unread-emails", async (req, res) => {
  const gmailChecker = new GmailChecker(
    process.env.GMAIL_EMAIL,
    process.env.GMAIL_PASSWORD,
  );
  const unreadEmails = await gmailChecker.getUnreadEmailsCount();

  res.send(`Кількість непрочитаних листів: ${unreadEmails}`);
});

app.listen(port, () => {
  console.log(`Gmail checker service listening at http://localhost:${port}`);
});
