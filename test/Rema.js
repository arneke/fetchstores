const expect = require('expect.js');
const Rema = require('../lib/Rema');

describe('Rema', function () {
  this.timeout(10000);

  describe('#check Rema Stasjonskvartalet Asker', () => {
    it('Fetches all stores and checks for a particular one', () => {
      const expected = {
        chain: 'Rema',
        providedId: '2056313',
        gln: '7080001403997',
        orgNumber: '917597243',
        name: 'Drengsrud',
        address: 'Drammensveien 896',
        postcode: '1383',
        city: 'ASKER',
        phone: '66781660',
        email: 'drengsrud@rema.no',
        latitude: 59.8287862,
        longitude: 10.4105293,
        hasPost: false,
        openSunday: false,
      };

      const rema = new Rema();
      return rema.fetchStores()
      .then((stores) => {
        let found = false;
        stores.forEach((store) => {
          if (store.gln === '7080001403997') {
            found = store;
          }
        });
        expect(found).to.eql(expected);
      });
    });
  });
});
