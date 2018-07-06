import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => (
  <div className="navbar is-primary">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img className="logo" src={require('../../dist/images/logo.png')} alt="Firepoll: online live polling service" />
      </a>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
      </div>
      <div className="navbar-end">
        <a href="/create" className="navbar-item has-text-primary-invert">Create Poll</a>
        <a href="/dashboard" className="navbar-item has-text-primary-invert">Dashboard</a>     
        <a className="navbar-item" onClick={props.logout}>Log Out</a>
      </div>      
    </div>
  </div>
)

export default Navbar;