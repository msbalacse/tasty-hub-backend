// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const accountSid = "AC069198ba770ea69979bd335994dfd069";
const authToken = "d31a10eef3d90ffced17f89733df17d8";
const client = twilio(accountSid, authToken);

app.post("/send-sms", (req, res) => {
  const { to, body } = req.body;
  client.messages
    .create({ body, to, from: "+1 717 535 8535" })
    .then((message) => {
      console.log("SMS sent with SID:", message.sid);
      res.json({ success: true });
    })
    .catch((err) => {
      console.error("Error sending SMS:", err);
      res.status(500).json({ error: "Failed to send SMS." });
    });
});

const PORT = 5000; // Or any port you prefer
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// // server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const twilio = require("twilio");
// const cors = require("cors");

// const app = express();
// const client = twilio(
//   "AC069198ba770ea69979bd335994dfd069",
//   "d31a10eef3d90ffced17f89733df17d8"
// ); // Replace with your Twilio credentials

// console.log("nodemon started");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// app.get("/", function (req, res) {
//   console.log("working");
// });

// app.post("/send-sms", async (req, res) => {
//   const { to, body } = req.body;

//   try {
//     const message = await client.messages.create({
//       to,
//       from: "+1 717 535 8535",
//       body,
//     });

//     console.log("Message SID:", message.sid);
//     res.json({ success: true, message: "SMS sent successfully!" });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//     res.status(500).json({ success: false, error: "Failed to send SMS" });
//   }
// });

// const port = 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));
