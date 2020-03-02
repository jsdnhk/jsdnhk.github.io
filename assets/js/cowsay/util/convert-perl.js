const fs = require('fs');

const COW_INPUT_PATH = '../piuccio/cowsay/cows';
const COW_OUTPUT_PATH = './cows';

const HEADER = 'module.exports = ({ thoughts, eyes, eye, tongue }) => `';
const FOOTER = '`;';

let cowFiles = fs.readdirSync(COW_INPUT_PATH);

cowFiles.forEach(cowFile => {
  let cowString = fs.readFileSync(COW_INPUT_PATH + '/' + cowFile).toString('utf-8');
  let inputLines = cowString.split(/\r?\n/);
  let start, end;

  inputLines.forEach((line, i) => {
    if (line.match(/\$the_cow/)) {
      start = i;
    } else if (line.match(/^\s*EOC\s*$/)) {
      end = i;
    }
  });

  if (start !== undefined && end && end > start) {
    let body = inputLines.slice(start + 1, end).join('\n');
    body = body
      .replace(/\$thoughts/g, '${thoughts}')
      .replace(/\$eyes/g, '${eyes}')
      .replace(/\$eye/g, '${eye}')
      .replace(/\$tongue/g, '${tongue}')
      .replace(/`/g, '\\`');
    body = HEADER + '\n' + body + '\n' + FOOTER;

    let outputFile = COW_OUTPUT_PATH + '/' + cowFile.replace('.cow', '.js');
    fs.writeFileSync(outputFile, body);
  } else {
    console.log('error');
  }
});

let index = [];
cowFiles.forEach(cowFile => {
  let bareCowFile = cowFile.replace('.cow', '');
  let cowVariable = bareCowFile.replace(/[-_\.]/g, '');
  if (cowVariable == 'default') {
    cowVariable = 'def';
  }
  index.push(`const ${cowVariable} = require('./${bareCowFile}');`);
});
index.push('');
cowFiles.forEach(cowFile => {
  let bareCowFile = cowFile.replace('.cow', '');
  let cowVariable = bareCowFile.replace(/[-_\.]/g, '');
  if (cowVariable == 'default') {
    cowVariable = 'def';
  }
  index.push(`exports['${bareCowFile}'] = ${cowVariable};`);
});

fs.writeFileSync(COW_OUTPUT_PATH + '/index.js', index.join('\n'));
