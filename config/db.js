const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
require("dotenv").config();

let gfs;
const connectDb = () => {
  try {
    // Create connection
    const conn = mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Init gfs
    conn.once('open', () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection(process.env.UPLOADS_COLLECTION_NAME); // uploads.chunks and uploads.files
    });
    console.log("MongoDB GridFS Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const getGfs = () => gfs;

module.exports = { connectDb, getGfs };
