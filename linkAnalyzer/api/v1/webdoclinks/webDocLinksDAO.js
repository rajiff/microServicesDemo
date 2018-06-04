let config = require('../../../config');
let logger = require('../../../logger');
let webDocumentLinksModel = require('./webDocLinks.entity');

const getHyperLinksOfWebDoc = function(webDocURL, { order, page, limit }, done) {
  webDocumentLinksModel.find({url: webDocURL}, (err, result) => {
    if (err) {
      logger.debug(`Error fetching record from webdocuments_hyperlink, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done fetching record from webdocuments_hyperlink, result: ${result.length}`);
    done(null, result);
  });
}

const saveWebDocLinks = function(webDocLinkColln, { upsert }, done) {

  if(!webDocLinkColln.length) {
    done({error: 'Empty collection of links cannot be saved..!'});
    return;
  }

  linksCollection = webDocLinkColln.map((docLink) => {
    let webDocLinks = {
    url: docLink.url,
    hyperlink: docLink.hyperlink,
    linksource: docLink.linksource,
    contenttype: docLink.contenttype,
    accessstatus: docLink.accessstatus,
    statusmessage: docLink.statusmessage,
    error: docLink.error,
    submittedon : new Date()
    }
    return webDocLinks;
  });

  webDocumentLinksModel.insertMany(linksCollection,(err, result) => {
    if (err) {
      logger.debug(`Error saving records to webdocuments_hyperlink, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done saving records to webdocuments_hyperlink, result: ${result.length}`);
    done(null, result);
  });
}

const updateWebDocLink = function(webDocLinkObj, options, done) {

  const updateDetails = {
    contenttype: webDocLinkObj.contenttype,
    accessstatus: webDocLinkObj.accessstatus,
    statusmessage: webDocLinkObj.statusmessage,
    error: webDocLinkObj.error,
    analyzedon: new Date()
  }

  webDocumentLinksModel.findOneAndUpdate({url: webDocLinkObj.url, hyperlink: webDocLinkObj.hyperlink }, updateDetails, {new: true}, (err, result) => {
    if(err) {
      logger.debug(`Error updating record to webdocuments_hyperlink, ERROR: ${err} RECORD: ${webDocLinkObj}`);
      done(err);
      return;
    }
    logger.debug(`Done updating record to webdocuments_hyperlink, result: ${result}`);
    done(null, result);
  });
}

module.exports = {
  getHyperLinksOfWebDoc,
  saveWebDocLinks,
  updateWebDocLink
}