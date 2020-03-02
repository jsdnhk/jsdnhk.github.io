const cowsay = require('../index');
const figlet = require('figlet');

figlet.text('Success', { font: 'Slant' }, (err, data) => {
  console.log(cowsay.say(data, { nowrap: true }));
});
