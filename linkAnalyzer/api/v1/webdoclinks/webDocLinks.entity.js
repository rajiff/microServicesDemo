let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  url: { type: String },
  hyperlink: { type: String },
  linksource: { type: String },
  contenttype: { type: String },
  accessstatus: { type: String },
  statusmessage: { type: String },
  error: { type: String },
  submittedon: { type: Date, default: Date.now() },
  analyzedon: { type: Date }
});

schema.index({url: 1, hyperlink: 1}, {unique: true});

// Export the Model
module.exports = mongoose.model('webdoc_links', schema);