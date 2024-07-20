require("dotenv").config();

const fs = require("fs");
const express = require("express");
const { createClient } = require("@deepgram/sdk");
const path = require("path");

const getYoutubeAudio = require("./get-youtube-audio");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", function (req, res) {
  res.send("pong-pong");
});

app.get("/get-subtitles", async function (req, res) {
  try {
    // 1. get query parameter 'link'
    const link = req.query.link;

    // get file buffer
    const buffer = await getYoutubeAudio(link);

    // send buffer to deepgram api
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-2",
      }
    );

    // if error throw
    if (error) throw new Error("something went wrong ...");

    // return subtitles
    res.status(200).send({
      // filename: filename,
      subtitles: result.results.channels[0].alternatives[0].transcript,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8888, function () {
  console.log("server running on PORT", process.env.PORT);
});
