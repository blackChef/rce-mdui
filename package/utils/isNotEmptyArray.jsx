import isArray from 'lodash/isArray';

let isNotEmptyArray = src => isArray(src) && src.length;

export default isNotEmptyArray;
