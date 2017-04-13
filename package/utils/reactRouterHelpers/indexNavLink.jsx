import React from 'react';
import { IndexLink } from 'react-router';


let view = React.createClass({
  displayName: 'indexNavLink',

  render() {
    return (
      <IndexLink {...this.props} className="navLink" activeClassName="is_active"/>
    );
  },
});


export { view };
