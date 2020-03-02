const cowsay = require('../index');
const fs = require('fs');

let cowFiles = fs.readdirSync('./cows');

let cows = cowFiles.filter(x => x != 'index.js').map(c => {
  let cow = require(`../cows/${c}`);
  cow.filename = c;
  return cow;
});

cows.forEach(cow => {
  console.log(cowsay.say(`Test of ${cow.filename}`, { cow }));
});
