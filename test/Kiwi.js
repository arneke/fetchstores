const expect = require('expect.js');
const Kiwi = require('../lib/Kiwi');

describe('Kiwi', function () {
  this.timeout(10000);

  describe('#check Kiwi Stasjonskvartalet Asker', () => {
    it('Fetches all stores and checks for a particular one', () => {
      const expected = {
        chain: 'Kiwi',
        providedId: '7080001164256',
        gln: '7080001164256',
        orgNumber: null,
        name: 'Kiwi 486 Bankveien',
        address: 'Bankveien 10',
        postcode: '1383',
        city: 'ASKER',
        phone: '66798760',
        email: 'kiwi.bankveien@kiwi.no',
        latitude: 59.834687555,
        longitude: 10.4326636581,
        hasPost: false,
        openSunday: true,
      };

      const kiwi = new Kiwi();
      return kiwi.fetchStores()
      .then((stores) => {
        let found = false;
        stores.forEach((store) => {
          if (store.gln === '7080001164256') {
            found = store;
          }
        });
        expect(found).to.eql(expected);
      });
    });
  });
});
