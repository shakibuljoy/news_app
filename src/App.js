
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
export default class App extends Component {

  static defaultProps = {
    list_items: null
  }
  category = 'science'
  render() {
    return (
      <>
      <Navbar list_items={this.props.list_items} />
      <Outlet />
      </>
    )
  }
}
