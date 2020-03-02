// exported by: watchify cowsay.mjs -o cowsay.js -t babelify --presets @babel/preset-env

var cowsay = require('cowsay');

import { think, SQUIRREL } from 'cowsay';

console.log(think({
    text: 'grazing in the browser',
    cow: SQUIRREL,
    eyes: 'pp',
    tongue: ';;',
}));

/*
browserify("./cowsay.mjs")
.transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
.bundle()
.pipe(fs.createWriteStream("bundle.js"));
*/