const NorgesGruppen = require('./NorgesGruppen');

function Kiwi() {
  Kiwi.super_.apply(this, arguments);
}

Kiwi.super_ = NorgesGruppen;

Kiwi.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Kiwi,
    enumerable: false
  }
});

Kiwi.prototype.getName = function () {
  return 'Kiwi';
};

Kiwi.prototype.ngChaindId = function() {
  return 1100;
};

module.exports = Kiwi;
