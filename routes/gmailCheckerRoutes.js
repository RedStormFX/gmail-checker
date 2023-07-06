const express = require("express");
const router = express.Router();
const GmailChecker = require("../services/GmailChecker");

router.get("/", async (req, res) => {
  try {
    const gmailChecker = new GmailChecker(
      process.env.GMAIL_EMAIL,
      process.env.GMAIL_PASSWORD,
    );
    const unreadEmails = await gmailChecker.getUnreadEmailsCount();

    console.log(
      `На ${process.env.GMAIL_EMAIL}, кількість непрочитаних листів: ${unreadEmails}`,
    );

    res.send(
      `На ${process.env.GMAIL_EMAIL}, кількість непрочитаних листів: ${unreadEmails}`,
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
