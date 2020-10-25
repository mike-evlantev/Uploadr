const path = require('path');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// @route   GET /
// @desc    Form to select file
// @access  Public
router.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname + '../../index.html'));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /upload
// @desc    Upload file to DB
// @access  Public
router.post('/upload', upload.single('file'), (req,res) => { // 'file' mathces the input type file with name 'file'. See index.html
  try {
    //res.json({file: req.file});
    res.redirect('/');
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;