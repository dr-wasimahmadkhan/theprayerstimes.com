import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header id="header" className="wpo-site-header wpo-header-style-3">
      <nav className="navigation navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="open-btn">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="index.html"><img src="/marketing/images/mylogo.png" alt="logo" /></a>
          </div>
          <div id="navbar" className="navbar-collapse collapse navbar-right navigation-holder">
            <button className="close-navbar"><i className="ti-close"></i></button>
            <ul className="nav navbar-nav">
              <li className="menu-item">
                <Link href="/" ><a>Home</a></Link>
              </li>
              <li><Link href="/about" ><a>About</a></Link></li>
              <li className="menu-item">
                <Link href="/services" ><a>Service</a></Link>
              </li>
              <li className="menu-item">
                <Link href="/complain" ><a>Complain</a></Link>
              </li>
              <li><Link href="/admin/sign-up" ><a>Sign up</a></Link></li>
              <li className="menu-item">
                <Link href="/admin/login" ><a >Login</a></Link>
              </li>
            </ul>
          </div>
          <div className="cart-search-contact">
            <div className="btns">
              <Link href="/contact" ><a className="theme-btn">Contact Now</a></Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export {Header};