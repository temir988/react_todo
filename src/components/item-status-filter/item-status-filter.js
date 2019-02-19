import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  constructor() {
    super();

    console.log(this.props);
  }


  render() {
    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-info"
          onClick={ (e) => { this.props.onFilter('all', e.target) } }
          >All</button>
        <button type="button"
          className="btn btn-outline-secondary"
          onClick={ (e) => { this.props.onFilter('active', e.target) } }
          >Active</button>
        <button type="button"
          className="btn btn-outline-secondary"
          onClick={ (e) => { this.props.onFilter('dones', e.target) } }
          >Done</button>
      </div>
    );
  }
};