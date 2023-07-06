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

    const unreadEmailsElement = await page.$(".bsU");

    let unreadCount = "0";
    if (unreadEmailsElement) {
      const innerText = await unreadEmailsElement.getProperty("innerText");
      const innerTextValue = await innerText.jsonValue();
      unreadCount = innerTextValue.replace(/\D/g, ""); // remove non-numeric characters
    }

    await browser.close();

    return unreadCount;
  }
}

module.exports = GmailChecker;
