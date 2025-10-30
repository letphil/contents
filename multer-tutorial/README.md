### node.js multer tutoria

This is a simple tutorial on how to use `multer`, a middleware for handling `multipart/form-data`, which is primarily used for uploading files in Node.js applications.

#### Prerequisites

- Node.js installed on your machine
- Basic knowledge of Express.js
- npm (Node Package Manager)

#### Step 1: Set Up Your Project

1. Create a new directory for your project and navigate into it:

```bash
mkdir multer-tutorial
cd multer-tutorial
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install the required packages:

```bash
npm install express multer
```

#### Step 2: Create the Server

1. Create a new file named `app.js` in your project directory:

```bash
touch app.js
```

2. Open `app.js` and set up a basic Express server with multer:

```javascript
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
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
```

#### Step 3: Create an HTML Form

1. Create a new file named `index.html` in your project directory:

```bash
touch index.html
```

2. Open `index.html` and add the following code to create a simple file upload form:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0
"
    />

    <title>File Upload</title>
  </head>
  <body>
    <h1>Upload a File</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myFile" required />
      <button type="submit">Upload</button>
    </form>
  </body>
</html>
```

#### Step 4: Run the Server

1. Start your server by running the following command in your terminal:

```bash
node app.js
```

2. Open your web browser and navigate to `http://localhost:3000`. You should see the file upload form.
3. Select a file and click the "Upload" button. You should see a success message if the file is uploaded successfully.

#### Conclusion

You have successfully set up a simple file upload system using Node.js and multer! You can now customize the storage options, file size limits, and other configurations as needed for your application.
