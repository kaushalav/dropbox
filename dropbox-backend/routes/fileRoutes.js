const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middleware/upload');

// Upload
router.post('/upload', upload.single('file'), fileController.uploadFile);

// List all files
router.get('/files', fileController.getFiles);

// To download file
router.get('/download/:id', fileController.downloadFile);

// to mark a file deleted
router.put('/deleteFile/:id', fileController.deleteFile);

// to restore files
router.put('/restoreFile/:id', fileController.restoreFile);

// Welcome /test route for testing purpose
router.get('/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to the site' });
});

module.exports = router;
