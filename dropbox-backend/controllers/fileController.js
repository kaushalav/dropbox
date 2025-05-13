const File = require("../models/File");
const path = require("path");

// Upload a file
exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
    });
    await file.save();
    res.status(201).json({ message: "File uploaded", file });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

// Get list of files
// isDeleted = true   will return all the trashed files
// otherwise the list of files that are not deleted.
exports.getFiles = async (req, res) => {
  try {
    const { isDeleted } = req.query;

    let filter = {};

    if (isDeleted === "true") {
      filter = { "trash.isDeleted": true };
    } else {
      filter = { "trash.isDeleted": false };
    }

    const files = await File.find(filter).select("-__v");
    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ error: "Could not fetch files" });
  }
};

// Download a file
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(__dirname, "../uploads", file.filename);
    res.download(filePath, file.originalName);
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "trash.isDeleted": true,
          "trash.timeStamp": new Date(),
        },
      },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({ message: "File moved to trash", file });
  } catch (error) {
    console.error("Error moving file to trash:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.restoreFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "trash.isDeleted": false,
          "trash.timeStamp": new Date(),
        },
      },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({ message: "File moved to trash", file });
  } catch (error) {
    console.error("Error moving file to trash:", error);
    res.status(500).json({ message: "Server error" });
  }
};