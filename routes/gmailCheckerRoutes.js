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
      `For ${process.env.GMAIL_EMAIL}, number of unread emails:${unreadEmails}`,
    );

    res.json({
      status: "success",
      message: `For ${process.env.GMAIL_EMAIL}, , number of unread emails: ${unreadEmails}`,
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

module.exports = router;
