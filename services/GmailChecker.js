const puppeteer = require("puppeteer");

class GmailChecker {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async getUnreadEmailsCount() {
    let browser;
    try {
      browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.goto("https://mail.google.com", { waitUntil: "networkidle2" });
      await page.waitForSelector('input[type="email"]', { timeout: 10000 });
      await page.type('input[type="email"]', this.email);
      await page.click("#identifierNext");
      await page.waitForSelector('input[type="password"]', {
        visible: true,
        timeout: 10000,
      });
      await page.type('input[type="password"]', this.password);
      await page.click("#passwordNext");
      await page.waitForSelector(".bsU", { visible: true, timeout: 10000 });

      const unreadEmailsElement = await page.$(".bsU");
      const unreadCount = unreadEmailsElement
        ? await unreadEmailsElement.evaluate((el) => el.innerText)
        : "0";

      return unreadCount.replace(/\D/g, ""); // remove non-numeric characters
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

module.exports = GmailChecker;
