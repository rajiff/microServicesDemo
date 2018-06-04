let config = require('../../../config');
let logger = require('../../../logger');
let webDocumentModel = require('./webDocuments.entity');

const insertWebDocument = function(newWebDocObj, { upsert }, done) {
  let webDocObj = {
    url: newWebDocObj.url,
    htmlversion: "",
    title: "",
    htmldoc: "",
    contenttype: "",
    accessstatus: "",
    statusmessage: "",
    error: "",
    submittedOn: (newWebDocObj.submittedon || new Date())
  };

  let newWebDocument = new webDocumentModel();
  newWebDocument.url = webDocObj.url;
  newWebDocument.htmlversion = webDocObj.htmlversion;
  newWebDocument.title = webDocObj.title;
  newWebDocument.htmldoc = webDocObj.htmldoc;
  newWebDocument.contenttype = webDocObj.contenttype;
  newWebDocument.accessstatus = webDocObj.accessstatus;
  newWebDocument.statusmessage = webDocObj.statusmessage;
  newWebDocument.error = webDocObj.error;
  newWebDocument.submittedon = webDocObj.submittedon;
  newWebDocument.save(function(err, result) {
    if (err) {
      logger.error(`Error inserting record to webdocuments_metdata, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done inserting record to webdocuments_metdata, result: ${result}`);
    done(null, result);
  });
}

const updateWebDocument = function(webDocObj, options, done) {
  const updateDetails = {
    htmlversion: webDocObj.htmlversion,
    title: webDocObj.title,
    htmldoc: webDocObj.htmldoc,
    contenttype: webDocObj.contenttype,
    accessstatus: webDocObj.accessstatus,
    statusmessage: webDocObj.statusmessage,
    error: webDocObj.error,
    analyzedon: (webDocObj.analyzedon || new Date())
  }

  webDocumentModel.findOneAndUpdate({url: webDocObj.url}, updateDetails, {new: true}, (err, result) => {
    if(err) {
      logger.debug(`Error updating record to webdocuments_metdata, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done updating record to webdocuments_metdata, result: ${result}`);
    done(null, result);
  });
}

const getAllWebDocument = function({ order, page, limit }, done) {
  webDocumentModel.find((err, result) => {
    if (err) {
      logger.debug(`Error fetching record from webdocuments_metdata, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done fetching record from webdocuments_metdata, result: ${result.length}`);
    done(null, result);
  });
}

const findWebDocumentByURL = function(docURL, done) {
  webDocumentModel.findOne({url: docURL}, (err, result) => {
    if (err) {
      logger.debug(`Error fetching record from webdocuments_metdata, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done fetching record from webdocuments_metdata, result: ${result}`);
    done(null, result);
  });
}

module.exports = {
  insertWebDocument,
  updateWebDocument,
  getAllWebDocument,
  findWebDocumentByURL
}