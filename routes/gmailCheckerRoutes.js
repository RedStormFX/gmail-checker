const express = require("express");
const { config } = require("../config/index");
const router = express.Router();
const GmailChecker = require("../services/GmailChecker");

router.get("/", async (req, res) => {
  try {
    const gmailChecker = new GmailChecker(
      config.gmailEmail,
      config.gmailPassword,
    );
    const unreadEmails = await gmailChecker.getUnreadEmailsCount();

    console.log(
      `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`, // Використовувати об'єкт конфігурації
    );

    res.json({
      status: "success",
      message: `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`, // Виправлено дублювання коми та використання об'єкта конфігурації
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
