const express = require("express");
const { config } = require("./config/index");
const GmailChecker = require("./services/GmailChecker");

const app = express();
const port = config.port;

app.get("/unread-emails", async (req, res) => {
  const gmailChecker = new GmailChecker(
    config.gmailEmail,
    config.gmailPassword,
  );

  try {
    const unreadEmails = await gmailChecker.getUnreadEmailsCount();
    console.log(
      `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`,
    );

    const message = `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`;
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching unread emails");
  }
});

app.listen(port, () => {
  console.log(`Gmail checker service listening at http://localhost:${port}`);
});
