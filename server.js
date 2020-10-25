const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const uploadRouter = require('./routes/upload');
const connectDb = require("./config/db");

// Connect to Database
connectDb();

// Init middleware
app.use(express.json({ extended: false })); // Allows to accept data within a body of a request (req.body)
app.use(methodOverride('_method'));

// Routes
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });
app.use('/', uploadRouter);

// Server static (react) assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // when home page route is hit load index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  ); // look in currentDirectory/client/build/index.html
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// to run locally: `npm run dev`
// to run deploy: `git push heroku master`