const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;

const AbstractChain = require('./AbstractChain');

const entities = new Entities();

function Bunnpris() {
  Bunnpris.super_.apply(this, arguments);
}

Bunnpris.super_ = AbstractChain;

Bunnpris.prototype = Object.create(AbstractChain.prototype, {
  constructor: {
    value: Bunnpris,
    enumerable: false,
  },
});

Bunnpris.prototype.getName = function () {
  return 'Bunnpris';
};

Bunnpris.prototype.flatten = function ($, el) {
  const cel = $(el);
  const infoHtml = cheerio.load(JSON.parse(cel.attr('data-dataobject')).Info);
  const name = infoHtml('h3').text().split(' - ')[0].replace('Bunnpris ', '');

  const rightSide = infoHtml('.rightside');
  const rightSideAr = entities.decode(rightSide.html()).replace(/\t/g, '').split('<br>');
  const street = (rightSideAr.length > 4) ? rightSideAr[0] : null;
  const postal = (rightSideAr.length > 4) ? rightSideAr[1] : rightSideAr[0];

  return {
    chain: this.getName(),
    providedId: `${cel.attr('data-id')}`,
    gln: null,
    orgNumber: null,
    name,
    address: (street) ? street.trim() : '',
    postcode: postal.substr(0, 4),
    city: postal.substr(5),
    phone: infoHtml('.rightside a[itemprop=telephone]').text().replace(/[^\w]/g, ''),
    email: infoHtml('.rightside a[itemprop=email]').text(),
    latitude: cel.attr('data-poslat'),
    longitude: cel.attr('data-poslng'),
    hasPost: (infoHtml('span[title=Posten]').length === 1),
    openSunday: (infoHtml('span[title=Sondagsaapent]').length === 1),
  };
};

Bunnpris.prototype.fetchStores = function () {
  return request.getAsync({
    url: 'https://bunnpris.no/butikker',
    jar: {},
    headers: {
      'User-Agent': 'Mozilla/7.0 (Macintosh; Intel Mac OS X 13_12_4) AppleWebKit/837.36',
    } })
  .then((fetchRes) => {
    const $ = cheerio.load(fetchRes.body);
    const ret = [];
    $('.mapMarker').each((i, el) => {
      const store = this.flatten($, el);
      ret.push(store);
    });

    return ret;
  });
};

module.exports = Bunnpris;
