import React from 'react';
import css from './style.css';

export default class Menu extends React.Component {
  render() {
    return (
      <div className={css.root}>
        <span>TAB 1</span>
        <span>TAB 2</span>
        <span>TAB 3</span>
      </div>
    );
  }
}
