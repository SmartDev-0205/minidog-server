const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/", function (request, res) {
  res.send("Hello world!");
});
app.post("/gpt/message.php", async (req, res) => {
  const formData = new FormData();
  console.log(req.body);
  if (!req.body) return;
  formData.append("text", req.body.text);

  const url = "https://xai.cx/gpt/message.php";

  const xaiRes = await axios.post(url, formData);
  res.send(xaiRes.data);
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("Server is up and running on port numner");
});
