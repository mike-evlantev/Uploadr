const express = require('express');
const router = express.Router();
const { getGfs } = require("../config/db");

// @route   GET /files
// @desc    Get all files in the collection
// @access  Public
router.get('/', (req, res) => {
  try {
    const gfs = getGfs();
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files found'
        });
      }
      res.json(files);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /files/:filename
// @desc    Get file by filename
// @access  Public
router.get('/:filename', (req, res) => {
  try {
    const gfs = getGfs();
    gfs
      .files
      .findOne({filename: req.params.filename}, (err, file) => {
        if (!file) {
          return res.status(404).json({
            err: 'File not found'
          });
        }
        res.json(file);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;