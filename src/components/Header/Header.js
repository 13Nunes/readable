// Basic
import React, { Component } from 'react';

// Assets
import banner from '../../assets/images/banner.jpg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={banner} alt="Banner" />
        <div className="container">
          <div className="text-box">
            <h1>TechnoBlog</h1>
            <p>What's up ?</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
