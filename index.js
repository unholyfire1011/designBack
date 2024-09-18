const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/shoeTextures", express.static(path.join(__dirname, "shoeTextures")));
app.use(
  "/shirtTextures",
  express.static(path.join(__dirname, "shirtTextures"))
);

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  const resp = await fetch("https://api.deepai.org/api/text2img", {
    method: "POST",
    headers: {
      "api-key": process.env.API_KEY,
    },
    body: prompt,
  });

  const data = await resp.json();
  res.json({
    success: true,
    data: [{ asset_url: data[0] }],
  });
});

app.post("/generate-shirt-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  const resp = await fetch("https://api.deepai.org/api/text2img", {
    method: "POST",
    headers: {
      "api-key": process.env.API_KEY,
    },
    body: prompt,
  });

  const data = await resp.json();
  res.json({
    success: true,
    data: [{ asset_url: data[0] }],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
