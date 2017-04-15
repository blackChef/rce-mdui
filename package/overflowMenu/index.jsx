import React from 'react';
import createComponent from 'rce-pattern/createComponent';
import { view as IconButton } from '../buttons/iconButton';
import { view as Menu } from '../menu/';
import { view as Slot } from '../slot/';
import toArray from 'lodash/toArray';
import debounce from 'lodash/debounce';

let name = 'overflowMenu';

let init = function() {};

let update = function({ type, payload, model, dispatch }) {};


let renderOverflowMenu = function(hiddenActions) {
  let style = {};
  if (!hiddenActions.length) {
    style = {
      visibility: 'hidden',
      maxWidth: 0,
      maxHeight: 0,
    };
  }

  let clones = hiddenActions.map(function(item, index) {
    let clone = React.cloneElement(item);
    return (
      <Slot key={index} name="item">{clone}</Slot>
    );
  });

  return (
    <div style={style} ref="menuButton" className="overflowMenu_menuButton">
      <Menu>
        {clones}
      </Menu>
    </div>
  );
};


let renderVisibleActions = function(visibleActions) {
  return visibleActions.map(function(item, index) {
    return (
      <div key={index} className="overflowMenu_actions_item">{item}</div>
    );
  });
};



let view = React.createClass({
  getInitialState() {
    return {
      visibleCount: this.getReactChildren().length,
      viewportWidth: this.getViewportWidth(),
    };
  },

  getViewportWidth() {
    return document.documentElement.clientWidth;
  },

  getReactChildren() {
    return React.Children.toArray(this.props.children);
  },

  getMenuButtonWidth: function() {
    return this.refs.menuButton.scrollWidth;
  },

  handleScaleDown() {
    // 从前往后，计算多少元素能铺满 available width。
    // 计算完元素之后。如果之前没显示 menu，现在显示 menu,
    // 再计算 menu 占据的空间会隐藏多少元素

    let visibleCount = this.calculateVisibleCount();

    let actions = this.getReactChildren();
    let oldIsMenuButtonShow = this.state.visibleCount < actions.length;
    let newIsMenuButtonShow = visibleCount < actions.length;

    if (!oldIsMenuButtonShow && newIsMenuButtonShow) {
      visibleCount = this.calculateVisibleCount( this.getMenuButtonWidth() );
    }

    this.setState({ visibleCount });
  },

  handleScaleUp() {
    // 从前往后，计算多少元素能铺满 available width。
    // 计算完元素之后。如果 menu 还显示,
    // 计算 menu 占据的空间够不够显示所有已经隐藏的。
    let visibleCount = this.calculateVisibleCount();

    let actions = this.getReactChildren();
    let newIsMenuButtonShow = visibleCount < actions.length;

    if (newIsMenuButtonShow) {
      let _visibleCount = this.calculateVisibleCount( -this.getMenuButtonWidth() );

      if (_visibleCount == actions.length) {
        visibleCount = _visibleCount;
      }
    }

    this.setState({ visibleCount });
  },

  calculateVisibleCount(offset = 0) {
    let { visibleWrapper, hiddenWrapper } = this.refs;
    let availableWidth = visibleWrapper.clientWidth - offset;

    // dom children
    let actions = toArray(visibleWrapper.children)
                   .concat( toArray(hiddenWrapper.children) );

    let w = 0;
    let i = 0;
    // 通过 w > clientWidth 退出循环时，actions[i] 是那个超出去的元素
    // 通过 i === actions.length 退出时，所有元素都应该显示
    while (w <= availableWidth) {
      if (i === actions.length) {
        i += 1;
        break;
      }
      w += actions[i].offsetWidth;
      i +=1;
    }

    return i - 1;
  },

  componentDidMount() {
    this.handleScaleDown();

    let onResize = function() {
      let currentViewportWidth = this.getViewportWidth();
      if (currentViewportWidth < this.state.viewportWidth) {
        this.handleScaleDown();
      } else {
        this.handleScaleUp();
      }

      this.setState({ viewportWidth: currentViewportWidth });
      this.refs.visibleWrapper.classList.remove('is_resizing');
    }.bind(this);

    this.resizeHandler = debounce(onResize, 500);
    window.addEventListener('resize', this.resizeHandler, false);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler, false);
  },

  render() {
    let { model, dispatch, children } = this.props;

    let actions = this.getReactChildren();
    let visibleCount = this.state.visibleCount;
    let visibleActions = actions.slice(0, visibleCount);
    let hiddenActions = actions.slice(visibleCount);


    return (
      <div className="overflowMenu">
        <div className="overflowMenu_actions" ref="visibleWrapper">
          {renderVisibleActions(visibleActions)}
        </div>

        {/*
          `display: none` makes item's size into 0.
          use `maxWidth` for flexbox
        */}
        <div className="overflowMenu_actions" ref="hiddenWrapper"
        style={{ visibility: 'hidden',
                 maxWidth: 0,
                 maxHeight: 0,
                 overflow: 'hidden'
                }}>
          {hiddenActions}
        </div>

        {renderOverflowMenu(hiddenActions)}
      </div>
    );
  },
});

view = createComponent({ name, view, update });
export { init, view };