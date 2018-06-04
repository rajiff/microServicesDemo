let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  url: { type: String, unique: true },
  htmlversion: { type: String },
  title: { type: String },
  htmldoc: { type: String },
  contenttype: { type: String },
  accessstatus: { type: String },
  statusmessage: { type: String },
  error: { type: String },
  submittedon: { type: Date, default: Date.now() },
  analyzedon: { type: Date }
});

// Export the Model
module.exports = mongoose.model('webdoc_metadata', schema);