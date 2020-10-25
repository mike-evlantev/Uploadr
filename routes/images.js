const express = require('express');
const router = express.Router();
const { getGfs } = require("../config/db");

// @route   GET /images/:filename
// @desc    Display image by filename
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

        // contentType = 'image/png'
        if (file.contentType.includes('image/')) {
          const readStream = gfs.createReadStream(file.filename);
          readStream.pipe(res);
        } else {
          return res.status(404).json({
            err: 'Not an image'
          });
        }
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;