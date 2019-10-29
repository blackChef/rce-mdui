import React from 'react';
import createClass from 'create-react-class';
import createComponent from 'rce-pattern/createComponent';
import setClassNames from 'classnames';
import include from 'lodash/includes';
import { view as Slot } from '../slot/';
import { view as TextFieldBtn } from '../textField/button';
import { view as Menu } from '../menu/';



let name = 'selectField';

let init = function() {
  return null; // selected option's value
};

let update = function({ payload, model }) {
  model.set(payload);
};

let view = createClass({
  selectFirstIfNonIsSelected(newOptions) {
    if (!newOptions.length) return;

    let { model, dispatch } = this.props;
    let selectedValue = model.val();
    let optionValues = newOptions.map(function(item) {
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

  render() {
    let {
      model,
      dispatch,
      floatingLabel = '',
      options, // [{ value, label }]
      readOnly = false,
      disabled = false,
      className = '',
      ...otherProps
    } = this.props;

    let selectedOption = options.find(i => i.value === model.val());
    let selectedLabel = selectedOption? selectedOption.label : undefined;
    let selectedValue = selectedOption? selectedOption.value : undefined;

    let optionItems = options.map(function({ value, label }) {
      let classNames = setClassNames('surroundGutter_padding', {
        u_text_appAccent: value === selectedValue
      });

      return (
        <Slot
          key={value}
          name="item"
          onClick={() => dispatch('change', value)}
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
