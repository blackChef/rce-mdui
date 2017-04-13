import isEqual from 'lodash/isEqual';

let getLocationInfo = function(props) {
  let { location: { query }, params } = props;
  return { query, params };
};

export default function(props1, props2) {
  return !isEqual(getLocationInfo(props1), getLocationInfo(props2));
};