const File = require('../models/File');
const path = require('path');
const fs = require('fs');

// Upload a file
exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded', file });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

// Get list of files
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().select('-__v');
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch files' });
  }
};

// Download a file
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const filePath = path.join(__dirname, '../files', file.filename);
    res.download(filePath, file.originalName);
  } catch (err) {
    res.status(500).json({ error: 'Download failed' });
  }
};
