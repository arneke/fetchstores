const expect = require('expect.js');
const Bunnpris = require('../lib/Bunnpris');

describe('Bunnpris', function () {
  this.timeout(10000);

  describe('#check Bunnpris Vettre', () => {
    it('Fetches all stores and checks for a particular one', () => {
      const expected = {
        chain: 'Bunnpris',
        providedId: '129',
        gln: null,
        orgNumber: null,
        name: 'Blakstad',
        address: 'Slemmestadveien 243',
        postcode: '1392',
        city: 'VETTRE',
        phone: '66900311',
        email: 'bpblakstad@bunnpris.no',
        latitude: '59.8151',
        longitude: '10.4675',
        hasPost: true,
        openSunday: false,
      };

      const bunnpris = new Bunnpris();
      return bunnpris.fetchStores()
      .then((stores) => {
        let found = false;
        stores.forEach((store) => {
          if (store.providedId === expected.providedId) {
            found = store;
          }
        });
        expect(found).to.eql(expected);
      });
    });
  });
});
