import result from 'lodash/result';
import curry from 'lodash/curry';
import isFunction from 'lodash/isFunction';

const isMatched = function(src, condition) {
  return isFunction(condition) ?
    condition(src) === true :
    src === condition;
};

const matchValues = curry(function(path, props1, props2, condition1, condition2) {
  const target1 = result(props1, path);
  const target2 = result(props2, path);

  const isTarget1Matched = isMatched(target1, condition1);
  const isTarget2Matched = isMatched(target2, condition2);

  return isTarget1Matched && isTarget2Matched;
});

const isDifferent = curry(function(path, props1, props2) {
  const target1 = result(props1, path);
  const target2 = result(props2, path);
  return target1 !== target2;
});

export { matchValues, isDifferent };
