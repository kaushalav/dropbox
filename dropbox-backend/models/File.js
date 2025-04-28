const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  trash: {
    isDeleted: {
      type: Boolean,
      default : false
    },
    timeStamp: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("File", fileSchema);
