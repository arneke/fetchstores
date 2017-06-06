const NorgesGruppen = require('./NorgesGruppen');

function Joker() {
  Joker.super_.apply(this, arguments);
}

Joker.super_ = NorgesGruppen;

Joker.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Joker,
    enumerable: false
  }
});

Joker.prototype.getName = function () {
  return 'Joker';
};

Joker.prototype.ngChaindId = function() {
  return 1220;
};

module.exports = Joker;