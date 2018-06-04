let config = require('../../../config');
let logger = require('../../../logger');
let webDocumentHeadingModel = require('./webDocHeadings.entity');

const getHeadingsOfWebDoc = function(webDocURL, { order, page, limit }, done) {
  webDocumentHeadingModel.find({url: webDocURL}, (err, result) => {
    if (err) {
      logger.debug(`Error fetching record from webdocuments_headings, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done fetching record from webdocuments_headings, result: ${result.length}`);
    done(null, result);
  });
}

const saveWebDocHeadings = function(webDocHeadingColln, { upsert }, done) {
  if(!webDocHeadingColln.length) {
    done({error: 'Empty collection cannot be saved..!'});
    return;
  }

  let occurrance = 0; // A running sequence to ensure duplicate headings, won't get overwritten

  headingCollection = webDocHeadingColln.map((docHeading) => {
    let webHeadings = {
      url: docHeading.url,
      heading: docHeading.heading,
      occurrance: ++occurrance,
      headingtext: docHeading.headingtext,
      headingtag: docHeading.headingtag,
      submittedon : new Date(),
      analyzedon: new Date()
    }
    return webHeadings;
  });
  
  logger.debug("Saving ", headingCollection.length, " headings out of ", webDocHeadingColln.length);
  webDocumentHeadingModel.insertMany(headingCollection, (err, result) => {
    if (err) {
      logger.debug(`Error saving records to webdocuments_headings, ERROR: ${err}`);
      done(err);
      return;
    }
    logger.debug(`Done saving records to webdocuments_headings, result: ${result.length}`);
    done(null, result);
  });
}


module.exports = {
  getHeadingsOfWebDoc,
  saveWebDocHeadings
}