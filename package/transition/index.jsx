import React from 'react';
import createClass from 'create-react-class';
import { afterTwoTicks, afterOneTick, afterDuration } from './afterTicks';
import omit from 'lodash/omit';

const Transition = createClass({
  resolveDuration(durationPropName, cssVarName, defaultVal) {
    if (this.props[durationPropName] !== undefined) {
      return this.props[durationPropName];
    }
    const cssEnterDuration = getComputedStyle(this.containerRef)
      .getPropertyValue(cssVarName);
    if (cssEnterDuration !== '') {
      return parseInt(cssEnterDuration, 10);
    }
    return defaultVal;
  },
  componentDidMount() {
    if (this.props.enterName === undefined) return;

    const { containerRef } = this;
    const {
      enterName,
      activeEnterName = enterName + '_active',
    } = this.props;

    // In order to have ticks work correctly,
    // we have to read css variable after class being added.
    containerRef.classList.add(enterName);
    const duration = this.resolveDuration('enterDuration', '--enter-duration', 300);

    afterTwoTicks()
      .then(() => {
        if (!containerRef) return;
        containerRef.classList.add(activeEnterName);
        return afterDuration(duration);
      })
      .then(() => {
        if (!containerRef) return;
        containerRef.classList.remove(enterName);
        containerRef.classList.remove(activeEnterName);
      });
  },
  componentWillUnmount() {
    if (this.props.leaveName === undefined) return;

    const { containerRef } = this;
    if (!containerRef) return;

    const {
      leaveName,
      activeLeaveName = leaveName + '_active',
    } = this.props;
    const duration = this.resolveDuration('leaveDuration', '--leave-duration', 300);
    const parent = containerRef.parentElement;
    const placeholder = document.createComment('transition placeholder');
    const snapshot = containerRef.cloneNode(true);
    parent.insertBefore(placeholder, containerRef);

    afterOneTick()
      .then(() => {
        if (!parent || !snapshot || !placeholder) return;
        parent.insertBefore(snapshot, placeholder);
        snapshot.classList.add(leaveName);
        return afterOneTick();
      })
      .then(() => {
        if (!snapshot) return;
        snapshot.classList.add(activeLeaveName);
        return afterDuration(duration);
      })
      .then(() => {
        snapshot && snapshot.remove();
        placeholder && placeholder.remove();
      });
  },
  render() {
    const { children } = this.props;
    const domProps = omit(this.props, [
      'children',
      'enterName',
      'leaveName',
      'activeEnterName',
      'activeLeaveName',
      'enterDuration',
      'leaveDuration',
    ]);
    return (
      <div
        {...domProps}
        ref={e => (this.containerRef = e)}
      >
        {children}
      </div>
    );
  }
});

const view = Transition;
export default Transition;
export { view };
