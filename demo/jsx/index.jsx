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
import MdInsertPhoto from 'react-icons/lib/md/insert-photo';



let init = function() {
  return {
    ...dInit(),
    show: true,
    f: false,
  };
};

let App = React.createClass({
  componentDidMount() {
  },
  render() {
    let { model } = this.props;
    return (
      <div>
        <Icon icon={MdInsertPhoto}/>
        <i className="mdFontIcon">insert_photo</i>
        <IconButton icon={MdInsertPhoto} className="iconButton--primary"></IconButton>
        <Fab icon={MdInsertPhoto} className="fab--primary"></Fab>
        <RwdFlatButton icon={MdInsertPhoto} className="rwdFlatButton--primary">fdsfdsf</RwdFlatButton>
        <TextFieldBtn className="textFieldBtn--dropDown" value="12313"></TextFieldBtn>

        <DateTimePicker model={model}></DateTimePicker>

        <Collapse className="collapse--leftArrow" model={model.f}>
          <Slot name="header" >header</Slot>
          <Slot name="body">body</Slot>
        </Collapse>
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