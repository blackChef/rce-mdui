import includes from 'lodash/includes';

const unTypableInputs = [
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


const isKeyboardShow = function(focusEventTarget) {
  const name = focusEventTarget.tagName.toLowerCase();
  const type = focusEventTarget.type;

  if (name === 'textarea') {
    return true;
  }

  if (name === 'input') {
    return !includes(unTypableInputs, type);
  }
};

export default isKeyboardShow;