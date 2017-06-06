const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const AbstractChain = require('./AbstractChain');

function Rema() {
  Rema.super_.apply(this, arguments);
}

Rema.super_ = AbstractChain;

Rema.prototype = Object.create(AbstractChain.prototype, {
  constructor: {
    value: Rema,
    enumerable: false,
  },
});

Rema.prototype.getName = function () {
  return 'Rema';
};

Rema.prototype.flatten = function (si) {
  return {
    chain: this.getName(),
    providedId: `${si.id}`,
    gln: `${si.gln}`,
    orgNumber: si.orgNr,
    name: si.shortName,
    address: si.visitAddress,
    postcode: si.visitPostCode,
    city: si.visitPlaceName,
    phone: si.phone.replace(/[^\w]/g, ''),
    email: si.email,
    latitude: si.latitude,
    longitude: si.longitude,
    hasPost: si.hasPostInStore !== 'false',
    openSunday: (si.openingHours.sunday.length !== 0),
  };
};

Rema.prototype.fetchStores = function () {
  return request.getAsync({
    url: 'https://www.rema.no/butikker',
    jar: {},
    headers: {
      'User-Agent': 'Mozilla/7.0 (Macintosh; Intel Mac OS X 13_12_4) AppleWebKit/837.36',
    } })
  .then((fetchRes) => {
    const body = fetchRes.body.toString();
    const start = body.indexOf('stores: [{') + 'stores: '.length;
    const storesJson = body.substring(start, body.indexOf('}]', start) + 2);
    return JSON.parse(storesJson);
  })
  .then((stores) => {
    const ret = [];
    stores.forEach((store) => {
      ret.push(this.flatten(store));
    });

    return ret;
  });
};

module.exports = Rema;
