const cowsay = require('../index');

// This imports all cows and destructures in place.
const { cat, cat2, bearface } = require('../cows');

// Or, if you want to keep the code as lean as possible, only import
// the cows you need like this:
//
//   const cat = require('../cows/cat.js');
//   const cat2 = require('../cows/cat2.js');

console.log(cowsay.say('moo out loud!'));
console.log(cowsay.think('moo to myself!'));
console.log(cowsay.think('Maui Wowee', { mode: 'stoned' }));
console.log(cowsay.think('Starbucks', { mode: 'wired' }));
console.log(cowsay.say("The static String.raw() method is a tag function of template literals. This is similar to the r prefix in Python, or the @ prefix in C# for string literals. (But it is not identical; see explanations in this issue.) It's used to get the raw string form of template strings, that is, substitutions (e.g. \${foo}) are processed, but escapes (e.g. \n) are not."));
console.log(cowsay.say(`Foo
       bar
               baz`, { nowrap: true }));
console.log(cowsay.say(`Foo
       bar
               baz`, { nowrap: false }));

console.log(cowsay.say('Meow', { cow: cat }));
console.log(cowsay.say('Meow', { cow: cat2 }));
console.log(cowsay.say('Feed me campers', { cow: bearface }));
