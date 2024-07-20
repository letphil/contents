require("dotenv").config();

const express = require("express");
const path = require("path");
const multer = require("multer");
const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

const PORT = process.env.PORT || 8888;
const app = express();

// --- multer ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/audio");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}.mp3`);
  },
});
const upload = multer({ storage });
// --- multer end -----

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("audio"), async function (req, res) {
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync(`./public/audio/${req.file.filename}`),
    {
      model: "nova-2",
    }
  );

  if (error) {
    res.status(500).send("soemthing went wrong...");
  }

  res.send({
    link: `http://localhost:8888/audio/${req.file.filename}`,
    result: result.results.channels[0].alternatives[0].transcript,
  });
});

app.listen(PORT, function () {
  console.log(`server running on port = ${PORT}`);
});
