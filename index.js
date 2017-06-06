const loader = require('./lib/Loader');
const csvWriter = require('./lib/CsvWriter');
const winston = require('winston');

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.fetchStores = function fetchStores(req, res) {
  loader.loadStores()
  .then(csvWriter.write)
  .then((csv) => {
    res.type('text/csv').status(200).send(csv);
  })
  .catch((e) => {
    winston.error(e);
    res.status(500).send('Ooops. Sorry.');
  });
};
