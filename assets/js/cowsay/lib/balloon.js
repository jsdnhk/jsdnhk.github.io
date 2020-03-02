const stringWidth = require('string-width');

const SPEECH_DELIMITERS = {
  first:  ['/', '\\'],
  middle: ['|', '|'],
  last:   ['\\', '/'],
  only:   ['<', '>'],  
};

const THOUGHT_DELIMITERS = {
  first:  ['(', ')'],
  middle: ['(', ')'],
  last:   ['(', ')'],
  only:   ['(', ')'],
};

exports.say = function(text, wrap) {
  return format(text, wrap, SPEECH_DELIMITERS);
};

exports.think = function(text, wrap) {
  return format(text, wrap, THOUGHT_DELIMITERS);
};

function format(text, wrap, delimiters) {
  let lines = split(text, wrap);
  let maxLength = Math.max(...lines.map(line => stringWidth(line)));

  let balloon = [
    top(maxLength),
    ...lines.map((line, i) => {
      let only = lines.length === 1;
      let first = i === 0;
      let last = i === lines.length - 1;
      let type = only ? 'only' : first ? 'first' : last ? 'last' : 'middle';
      let [ start, end ] = delimiters[type];
      return `${start} ${pad(line, maxLength)} ${end}`;
    }),
    bottom(maxLength),
  ];
  return balloon.join('\n');
}

function split(text, wrap) {
  text = text
    .replace(/\r\n?|[\n\u2028\u2029]/g, '\n')
    .replace(/^\uFEFF/, '')
    .replace(/\t/g, '        ');

  let lines = [];

  if (wrap) {
    text = text.split(/\s+/).join(' ');

    let start = 0;
    while (start < text.length) {
      let end = Math.min(start + wrap, text.length);
      let space = text.lastIndexOf(' ', end);
      if (end < text.length && space > start) {
        end = space;
      }
      lines.push(text.substring(start, end));
      if (space > start) {
        start = end + 1;
      } else {
        start = end;
      }
    }
  } else {
    lines = text.split('\n');    
  }
  return lines;
}

function pad(text, length) {
  let trailingSpaces = (new Array(length - stringWidth(text) + 1)).join(' ');
  return text + trailingSpaces;
}

function top(length) {
  return ' ' + new Array(length + 3).join('_');
}

function bottom(length) {
  return ' ' + new Array(length + 3).join('-');
}
