const path = require("path");
const express = require('express');
//const connectDb = require("./config/db");
require("dotenv").config();

const app = express();
// const authRouter = require('./routes/auth');
// const docRouter = require('./routes/documents');
// const transactionsRouter = require('./routes/transactions');
// const usersRouter = require('./routes/users');

// Database
//connectDb();

// Init middleware
app.use(express.json({ extended: false })); // Allows to accept data within a body of a request (req.body)

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
// app.use('/api/auth', authRouter);
// app.use('/api/documents', docRouter);
// app.use('/api/transactions', transactionsRouter);
// app.use('/api/users', usersRouter);

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