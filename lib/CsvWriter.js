const json2csv = require('json2csv');

const fields = [
  'chain',
  'providedId',
  'gln',
  'orgNumber',
  'name',
  'address',
  'postcode',
  'city',
  'phone',
  'email',
  'latitude',
  'longitude',
  'hasPost',
  'openSunday'
];

const CsvWriter = {
  write(chainArrays) {
    // Data comes per chain, flatten
    const data = [];
    chainArrays.forEach((ar) => {
      ar.forEach((el) => {
        data.push(el);
      });
    });

    return json2csv({ data: data, fields: fields, del: ';'});
  }
};

module.exports = CsvWriter;