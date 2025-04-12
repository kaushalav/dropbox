const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middleware/upload');

// Upload
router.post('/upload', upload.single('file'), fileController.uploadFile);

// List all files
router.get('/files', fileController.getFiles);

// Download
router.get('/download/:id', fileController.downloadFile);

// Welcome/test route
router.get('/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to the site' });
});

module.exports = router;
