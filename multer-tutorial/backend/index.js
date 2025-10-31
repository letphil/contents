require("dotenv").config();

// require express into app
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const apiRoutes = require("./routes/api/index.js");

const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// invoking express
const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

app.use("/api", apiRoutes);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

app.get("/ping", function (req, res) {
  console.log("req =", req);
  res.send("pong");
});

app.post("/upload", multer({ storage }).single("myFile"), function (req, res) {
  res.send({
    msg: "FILE UPLOADED",
    fileName: req.file.filename,
  });
});

app.listen(PORT, function () {
  console.log("server running on port:", PORT);
});
