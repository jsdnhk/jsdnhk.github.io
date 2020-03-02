const cowsay = require('../index');

let modes = [
  'borg', 'dead', 'greedy', 'paranoid',
  'stoned', 'tired', 'wired', 'youthful',
];

modes.forEach(mode => {
  console.log(cowsay.say(`Test of ${mode} cow.`, { mode }));
});
