const express = require("express");
const GmailChecker = require("./GmailChecker");

const app = express();
const port = 3000;

app.get("/unread-emails", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

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
