const fs = require("fs");
const ytdl = require("ytdl-core");

/**
 *
 * @param {String} link - youtubelink
 * @returns {Promise<Buffer>} - audio buffer
 */
async function getYoutubeAudio(link) {
  // https://www.youtube.com/watch?v=dQw4w9WgXcQ

  // 1. make filename
  const filename = `${link.split("=")[1]}.mp3`;

  // 2. upload file to audio folder
  const stream = await ytdl(link, { filter: "audioonly" }).pipe(
    fs.createWriteStream("audio/" + filename)
  );

  console.log("stream =", stream);

  return new Promise(function (resolve, reject) {
    stream.on("finish", function () {
      const buffer = fs.readFileSync("./audio/" + filename);
      resolve(buffer);
    });

    stream.on("error", function () {
      reject(error);
    });
  });
}

module.exports = getYoutubeAudio;
