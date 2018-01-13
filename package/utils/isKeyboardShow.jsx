import includes from 'lodash/includes';

let unTypableInputs = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime',
  'datetime-local',
  'file',
  'image',
  'mounth',
  'radio',
  'range',
  'reset',
  'submit',
  'time',
  'week',
];


let isKeyboardShow = function(focusEventTarget) {
  let name = focusEventTarget.tagName.toLowerCase();
  let type = focusEventTarget.type;

  if (name === 'textarea') {
    return true;
  }

  if (name === 'input') {
    return !includes(unTypableInputs, type);
  }
};

export default isKeyboardShow;