const NorgesGruppen = require('./NorgesGruppen');

function Naermat() {
  Naermat.super_.apply(this, arguments);
}

Naermat.super_ = NorgesGruppen;

Naermat.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Naermat,
    enumerable: false
  }
});

Naermat.prototype.getName = function () {
  return 'Naermat';
};

Naermat.prototype.ngChaindId = function() {
  return 1270;
};

module.exports = Naermat;