import React from 'react';
import { Link } from 'react-router';

let view = React.createClass({
  displayName: 'navLink',

  render() {
    let { className: classNameModifier = '', ...otherProps} = this.props;

    return (
      <Link
        className={`navLink ${classNameModifier}`}
        {...otherProps}
        activeClassName="is_active"
      />
    );
  },
});


export { view };
