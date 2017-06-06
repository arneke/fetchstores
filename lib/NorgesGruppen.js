const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const AbstractChain = require('./AbstractChain');

function NorgesGruppen() {
  NorgesGruppen.super_.apply(this, arguments);
}

NorgesGruppen.super_ = AbstractChain;

NorgesGruppen.prototype = Object.create(AbstractChain.prototype, {
  constructor: {
    value: NorgesGruppen,
    enumerable: false
  }
});

NorgesGruppen.prototype.getName = function () {
  return 'NorgesGruppenAbstract';
};

NorgesGruppen.prototype.flatten = function(si) {
  return {
    chain: this.getName(),
    providedId: `${si.id}`,
    gln: `${si.id}`,
    orgNumber: null,
    name: si.name,
    address: si.visitaddress,
    postcode: si.zipcode,
    city: si.zipcitycode,
    phone: si.phone.replace(/[^\w]/g, ''),
    email: si.email,
    latitude: si.location.latitude,
    longitude: si.location.longitude,
    hasPost: (si.services.indexOf('PIB') !== -1),
    openSunday: si.openinghours.isopenonsunday
  };
};

NorgesGruppen.prototype.fetchStores = function () {
  return request.getAsync({
    url: `https://platform-rest-prod.ngdata.no/api/FindStore/StoresClosestToMe/${this.ngChaindId()}/`,
    qs: {
      latitude: 65.4,
      longitude: 16.799999999999955,
      minnumberofstores: 1,
      maxNumberOfStores: 0,
      maxDistance: 12522761,
      filter: 'none',
      checkForHolidays: 35
    },
    json: true,
    jar: {},
    headers: {
      'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36`
    }
  })
  .then((fetchRes) => {
    const ret = [];
    fetchRes.body.forEach((wrapper) => {
      const store = wrapper.store;
      ret.push(this.flatten(store));
    });
    
    return ret;
  });
};

module.exports = NorgesGruppen;
