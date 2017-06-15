import result from 'lodash/result';
import curry from 'lodash/curry';
import isFunction from 'lodash/isFunction';

let isMatched = function(src, condition) {
  return isFunction(condition) ?
    condition(src) === true :
    src === condition;
};

let matchValues = curry(function(path, props1, props2, condition1, condition2) {
  let target1 = result(props1, path);
  let target2 = result(props2, path);

  let isTarget1Matched = isMatched(target1, condition1);
  let isTarget2Matched = isMatched(target2, condition2);

  return isTarget1Matched && isTarget2Matched;
});

let isDifferent = curry(function(path, props1, props2) {
  let target1 = result(props1, path);
  let target2 = result(props2, path);
  return target1 !== target2;
});

export { matchValues, isDifferent };
