const Promise = require('bluebird');
const Bunnpris = require('./Bunnpris');
const Jacobs = require('./Jacobs');
const Joker = require('./Joker');
const Kiwi = require('./Kiwi');
const Meny = require('./Meny');
const Naermat = require('./Naermat');
const Rema = require('./Rema');
const Spar = require('./Spar');


const Loader = {
  // Slowest first
  chains: [
    new Bunnpris(),
    new Rema(),
    new Kiwi(),
    new Jacobs(),
    new Joker(),
    new Naermat(),
    new Meny(),
    new Spar()
  ],
  
  loadStores() {
    const tasks = [];
    this.chains.forEach((chainInst) => {
      tasks.push(((chain) => {
        console.log(`Launching ${chain.getName()}`);
        return chain.fetchStores()
        .then((res) => {
          console.log(`Got ${res.length} from ${chain.getName()}`);
          return res;
        });
      })(chainInst));
    });
    
    return Promise.all(tasks);
  }
};

module.exports = Loader;