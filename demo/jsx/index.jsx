import React from 'react';
import ReactDOM from 'react-dom';
import createModelHolder from 'rce-pattern/createModelHolder';
import createComponent from 'rce-pattern/createComponent';
import { view as Icon } from 'icon/';
import { view as Slot } from 'slot/';
import { view as IconButton } from 'buttons/iconButton';
import { view as Fab } from 'buttons/fab';
import { view as RwdFlatButton } from 'buttons/rwdFlatButton';
import { view as TextFieldBtn } from 'textField/button';
import { view as Collapse } from 'collapse/';
import { view as DateTimePicker, init as dInit } from 'dateTimePicker/';

let init = function() {
  return {
    ...dInit(),
    show: true
  };
};

let App = React.createClass({
  componentDidMount() {
  },
  render() {
    let { model } = this.props;
    return (
      <div>
        <Icon icon="insert_photo"/>
        <i className="mdFontIcon">insert_photo</i>
        <IconButton icon="insert_photo" className="iconButton--primary"></IconButton>
        <Fab icon="insert_photo" className="fab--primary"></Fab>
        <RwdFlatButton icon="insert_photo" className="rwdFlatButton--primary">fdsfdsf</RwdFlatButton>
        <TextFieldBtn className="textFieldBtn--dropDown" value="12313"></TextFieldBtn>

        <DateTimePicker model={model}></DateTimePicker>
      </div>
    );
  },
});


App = createComponent({
  view: App
});

App = createModelHolder(App, init);

ReactDOM.render(
  <App />,
  document.querySelector('.appContainer')
);