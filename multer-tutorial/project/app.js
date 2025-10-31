const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
// app.use(express.static("uploads"));

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload variable
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // Limit file size to 1MB
// }).single("myFile"); // 'myFile' is the name of the input field

// Create uploads directory if it doesn't exist
const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Set up a route to handle file uploads

// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).send("Error uploading file.");
//     }
//     res.send("File uploaded successfully: " + req.file.filename);
//   });
// });

app.post(
  "/upload",
  multer({ storage: storage }).single("myFile"),
  (req, res) => {
    res.send("File uploaded successfully: " + req.file.filename);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
