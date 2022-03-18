import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link className="header__logo" to="/">
          <img src={require('../../img/logo.png')} alt="Logotipo"></img>
        </Link>
        <Link className="purchaseIcon" to="/purchases">
          <img src={require('../../img/purchase.png')} alt="purchasesIcon"></img>
          <p>Purchases</p>
        </Link>
        <Link className="loginIcon" to="/login">
          <img src="https://img.icons8.com/ios/50/000000/login-rounded-right--v1.png" alt="loginIcon"></img>
          <p>Login</p>
        </Link>
      </header>
    );
  }
}

export default Header;