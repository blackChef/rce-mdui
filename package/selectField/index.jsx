import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import include from 'lodash/includes';
import { view as Slot } from '../slot/';
import { view as TextFieldBtn } from '../textField/button';
import { view as Menu } from '../menu/';



const name = 'selectField';

const init = function() {
  return null; // selected option's value
};

const update = function({ payload, model }) {
  model.set(payload);
};

let view = createClass({
  selectFirstIfNonIsSelected(newOptions) {
    if (!newOptions.length) return;

    const { model, dispatch } = this.props;
    const selectedValue = model.val();
    const optionValues = newOptions.map(function(item) {
      return item.value;
    });

    if ( !include(optionValues, selectedValue) ) {
      dispatch('change', optionValues[0]);
    }
  },

  componentDidUpdate() {
    this.selectFirstIfNonIsSelected(this.props.options);
  },

  componentDidMount() {
    this.selectFirstIfNonIsSelected(this.props.options);
  },

  onSelect(value) {
    const { dispatch, onChange } = this.props;
    dispatch('change', value);
    onChange && onChange(value);
  },

  render() {
    const {
      model,
      floatingLabel = '',
      options, // [{ value, label }]
      readOnly = false,
      disabled = false,
      className = '',
      ...otherProps
    } = this.props;
    const { onSelect } = this;

    const selectedOption = options.find(i => i.value === model.val());
    const selectedLabel = selectedOption? selectedOption.label : undefined;
    const selectedValue = selectedOption? selectedOption.value : undefined;

    const optionItems = options.map(function({ value, label }) {
      const classNames = setClassNames('surroundGutter_padding', {
        u_text_appAccent: value === selectedValue
      });

      return (
        <Slot
          key={value}
          name="item"
          onClick={() => onSelect(value)}
        >
          <div className={classNames}>{label}</div>
        </Slot>
      );
    });


    return (
      <div className={`selectField ${className}`}>
        <Menu
          {...otherProps}
          disabled={readOnly || disabled}
          attachment="top center"
          targetAttachment="top center"
          fullWidth={true}
          triggerElement={
            <TextFieldBtn
              className="textFieldBtn--dropDown"
              value={selectedLabel}
              floatingLabel={floatingLabel}
              readOnly={readOnly}
              disabled={disabled}
            />
          }
        >
          {optionItems}
        </Menu>
      </div>
    );
  },
});


view = createComponent({ name, view, update, cursorProps: ['options'] });
export default view;
export { init, view };
