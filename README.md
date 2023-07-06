# Gmail Checker Service

This project is an example of a web service that uses Puppeteer to automate logging into a Gmail account and checking the number of unread emails.

## Requirements

- Node.js
- npm

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/your-repository/gmail-checker-service.git
   cd gmail-checker-service
   ```

   or download the code manually.

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root of the project and specify your Gmail credentials:

   ```
   GMAIL_EMAIL=your-email@gmail.com
   GMAIL_PASSWORD=your-password
   ```

## Running

1. Start the web service:

   ```
   node app.js
   ```

2. Open a web browser or use a tool such as curl or Postman to access the service at the following URL:

   ```
   http://localhost:3000/unread-emails
   ```
