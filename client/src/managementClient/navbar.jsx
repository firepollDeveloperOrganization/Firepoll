import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => (
  <header className="navbar">
    <div className="brand">
      <img className="brand__logo" src={require('../../dist/images/logo.png')} alt="Firepoll: online live polling service" /> 
      <span className="brand__name">FIREPOLL</span>
    </div>
    <nav className="user-nav">
      <div className="user-nav__button-box" onClick = {() => {props.history.push('/dashboard')}}>
        <a className="user-nav__button nav-button">Dashboard &nbsp;<i className="fa-fw fas fa-home"></i></a>
      </div>
      <div className="user-nav__button-box" onClick = {() => {props.history.push('/create')}}>
        <a className="user-nav__button nav-button">Create Poll &nbsp;<i className="fa-fw far fa-calendar-plus"></i></a>
      </div>
      <div className="user-nav__button-box">
        <a className="user-nav__button nav-button" onClick={() => {console.log('logging out'); props.logout();}}>Log Out &nbsp;<i className="fa-fw fas fa-sign-out-alt"></i></a>
      </div>
    </nav>
  </header>
)

export default Navbar;

  {/*
  <div className="navbar is-primary">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img className="logo" src={require('../../dist/images/logo-white.png')} alt="Firepoll: online live polling service" />
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
  </div>*/}