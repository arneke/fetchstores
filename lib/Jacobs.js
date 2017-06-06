const NorgesGruppen = require('./NorgesGruppen');

function Jacobs() {
  Jacobs.super_.apply(this, arguments);
}

Jacobs.super_ = NorgesGruppen;

Jacobs.prototype = Object.create(NorgesGruppen.prototype, {
  constructor: {
    value: Jacobs,
    enumerable: false
  }
});

Jacobs.prototype.getName = function () {
  return 'Jacobs';
};

Jacobs.prototype.ngChaindId = function() {
  return 1210;
};

// This is a hoax in the name of completeness
Jacobs.prototype.fetchStores = function () {
  return Promise.resolve([{
    chain: this.getName(),
    providedId: 1,
    gln: 1,
    orgNumber: null,
    name: 'Holtet',
    address: 'Ekebergveien 145',
    postcode: '1178',
    city: 'Oslo',
    phone: '23180100',
    email: null,
    latitude: 59.8812327,
    longitude: 10.7842535,
    hasPost: true,
    openSunday: false
  },{
    chain: this.getName(),
    providedId: 2,
    gln: 2,
    orgNumber: null,
    name: 'Majorstuen',
    address: 'Essendropsgt. 9',
    postcode: '0368',
    city: 'Oslo',
    phone: '23205520',
    email: null,
    latitude: 59.9293973,
    longitude: 10.709727,
    hasPost: false,
    openSunday: false
  }]);
};

module.exports = Jacobs;