// Basic
import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import banner from '../../assets/images/banner.jpg';
import './Header.css';

const Header = () => (
  <div className="header">
    <img src={banner} alt="Banner" />
    <div className="container">
      <div className="text-box">
        <h1><Link to={'/'}>TechnoBlog</Link></h1>
        <p>What's up ?</p>
      </div>
    </div>
  </div>
);

export default Header;
