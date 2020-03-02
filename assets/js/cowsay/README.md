# cowsay

[![Build Status](https://travis-ci.com/johnnysprinkles/cowsay.svg?branch=master)](https://travis-ci.com/johnnysprinkles/cowsay)
[![npm version](https://badge.fury.io/js/cowsay2.svg)](https://badge.fury.io/js/cowsay2)

Modernized version of cowsay

This borrows from https://github.com/piuccio/cowsay.
The cow files are the same content but instead of Perl heredoc text files
they're ES6 template literals.

* No reading files at runtime. Cows are declared as static compile-time dependencies.
* Works the same whether client-side or server-side, and whether running from
  raw source for from a transpiled bundle.
* Leveraging modern language features like destructuring and arrow functions.
* Update to more modern Javascript style with two-space indents, single quoted
  strings, and `const` and `let` instead of `var`, as you might see on the Google
  or airbnb JS style guides.

### Usage

See test/example.js for examples, but the basic usage is:

    cowsay.say('What you want to say');

Or pass some options:

    cowsay.say('Did you hear someting?', { mode: 'paranoid' });
    cowsay.say('A quick brown fox jumped over the lazy dog', { W: 15 });
    cowsay.think('I\'m looking sideways', { e: 'cc' });

Get a demo of all available cows with `node test/cows.js`, and get a demo of all
available modes with `node test/modes.js`. Get a general test demonstrating line wrapping
and whitespace handling at `node test/example.js`.

### Importing cows

The above examples use the default cow file. You can import other cows and pass them in
on the `cow` option. Do that one of two ways.

Import all cows, like:

    let cows = require('cowsay2/cows');
    cowsay('Gobble gobble', { cow: cows.turkey });

Or just import the cow you need (better for client-side bundles):

    let cow = require('cowsay2/turkey');
    cowsay('Gobble gobble', { cow });

### Text options

* `n` or `nowrap`: Don't do any line wrapping beyond whatever newlines occur in the provided text
* `W`: Number of columns to wrap at (defaults to 40)

### Examples

See some live example on RunKit at
https://runkit.com/johnnysprinkles/5e28a5470e860e001a25123f

    console.log(cowsay('hi'));
     ____
    < hi >
     ----
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||


    console.log(cowsay.say("The static String.raw() method is a tag function of template literals. This is similar to the r prefix in Python, or the @ prefix in C# for string literals. (But it is not identical; see explanations in this issue.) It's used to get the raw string form of template strings, that is, substitutions (e.g. \${foo}) are processed, but escapes (e.g. \n) are not."));
     __________________________________________
    / The static String.raw() method is a tag  \
    | function of template literals. This is   |
    | similar to the r prefix in Python, or    |
    | the @ prefix in C# for string literals.  |
    | (But it is not identical; see            |
    | explanations in this issue.) It's used   |
    | to get the raw string form of template   |
    | strings, that is, substitutions (e.g.    |
    | ${foo}) are processed, but escapes (e.g. |
    \ ) are not.                               /
     ------------------------------------------
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||


    const whale = require('./cows/whale');
    console.log(cowsay.say('Moo', { cow: whale }));
     _____
    < Moo >
     -----
       \
        \
         \
                    '-.
          .---._     \ .--'
        /       `-..__)  ,-'
       |    0           /
        --.__,   .__.,`
         `-.___'._\_.'

### Related packages

https://github.com/piuccio/cowsay
