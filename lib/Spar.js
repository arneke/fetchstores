const NorgesGruppen = require('./NorgesGruppen');

function Spar() {
  Spar.super_.apply(this, arguments);
}

Spar.super_ = NorgesGruppen;

Spar.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Spar,
    enumerable: false
  }
});

Spar.prototype.getName = function () {
  return 'Spar';
};

Spar.prototype.ngChaindId = function() {
  return 1210;
};

module.exports = Spar;