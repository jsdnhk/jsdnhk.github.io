const balloon = require('./lib/balloon');
const defaultCow = require('./cows/default');
const { getFace } = require('./lib/faces');

const DEFAULT_COLUMNS = 40;

function doIt(text, options = {}, action) {
  let nowrap = options.n || options.nowrap;
  let wrapWidth = nowrap ? undefined : (options.W || DEFAULT_COLUMNS);
  let filledBalloon = balloon[action](text, wrapWidth);

  let cow = options.cow || defaultCow;
  let { eyes, tongue } = getFace(options);

  let filledCow = cow({
    thoughts: action == 'say' ? '\\' : 'o',
    eyes,
    tongue,
    eye: eyes[0],
  });

  return filledBalloon + filledCow;
}

exports.say = function(text, options) {
  return doIt(text, options, 'say');
};

exports.think = function(text, options) {
  return doIt(text, options, 'think');
};
