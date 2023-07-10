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
      `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`, 
    );

    res.json({
      status: "success",
      message: `For ${config.gmailEmail}, number of unread emails: ${unreadEmails}`, 
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
