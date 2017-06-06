const Promise = require('bluebird');

function AbstractChain() {}

AbstractChain.prototype.getName = function () {
  return 'Not implemented.';
};

AbstractChain.prototype.fetchStores = function () {
  console.error('Should not run AbstractChain.fetchStores');
  return Promise.reject();
};

module.exports = AbstractChain;
