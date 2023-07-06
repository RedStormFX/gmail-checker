const puppeteer = require("puppeteer");

class GmailChecker {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async getUnreadEmailsCount() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://mail.google.com");
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', this.email);
    await page.click("#identifierNext");
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', this.password);
    await page.click("#passwordNext");
    await page.waitForSelector('div[role="navigation"]', { visible: true });

    const unreadEmails = await page.evaluate(() => {
      const element = document.querySelector('div[aria-label*="Unread"]');
      return element ? element.textContent : "0";
    });

    await browser.close();

    return unreadEmails;
  }
}

module.exports = GmailChecker;
