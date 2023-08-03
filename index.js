// server.js
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
const client = twilio(
  "AC069198ba770ea69979bd335994dfd069",
  "d31a10eef3d90ffced17f89733df17d8"
); // Replace with your Twilio credentials

console.log("nodemon started");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  console.log("working");
});

app.post("/send-sms", async (req, res) => {
  const { to, body } = req.body;

  try {
    const message = await client.messages.create({
      to,
      from: "+1 717 535 8535",
      body,
    });

    console.log("Message SID:", message.sid);
    res.json({ success: true, message: "SMS sent successfully!" });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ success: false, error: "Failed to send SMS" });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
