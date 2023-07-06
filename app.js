const express = require("express");
const gmailRoutes = require("./routes/gmailCheckerRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/unread-emails", gmailRoutes);

app.listen(port, () => {
  console.log(`Gmail checker service listening at http://localhost:${port}`);
});
