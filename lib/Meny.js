const NorgesGruppen = require('./NorgesGruppen');

function Meny() {
  Meny.super_.apply(this, arguments);
}

Meny.super_ = NorgesGruppen;

Meny.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Meny,
    enumerable: false,
  },
});

Meny.prototype.getName = function () {
  return 'Meny';
};

Meny.prototype.ngChaindId = function () {
  return 1300;
};

module.exports = Meny;
