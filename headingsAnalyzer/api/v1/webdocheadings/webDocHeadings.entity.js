let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  url: { type: String },
  heading: { type: String },
  occurrance: { type: String },
  headingtext: { type: String },
  headingtag: { type: String },
  submittedon: { type: Date, default: Date.now() },
  analyzedon: { type: Date }
});

schema.index({url: 1, occurrance: 1}, {unique: true});

// Export the Model
module.exports = mongoose.model('webdoc_headings', schema);
