import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="wpo-ne-footer-2">
      {/*<section className="wpo-news-letter-section">*/}
      {/*  <div className="container">*/}
      {/*    <div className="wpo-news-letter-wrap">*/}
      {/*      <div className="row">*/}
      {/*        <div className="col col-md-10 col-md-offset-1 col-sm-8 col-sm-offset-2">*/}
      {/*          <div className="wpo-newsletter">*/}
      {/*            <h3>Follow us For ferther information</h3>*/}
      {/*            <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>*/}
      {/*            <div className="wpo-newsletter-form">*/}
      {/*              <form>*/}
      {/*                <div>*/}
      {/*                  <input type="text" placeholder="Enter Your Email" className="form-control" />*/}
      {/*                  <button type="submit">Subscribe</button>*/}
      {/*                </div>*/}
      {/*              </form>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-3 col-md-3 col-sm-6">
                <div className="widget about-widget">
                  <div className="logo widget-title">
                    <img src="/marketing/images/mylogo.png" alt="blog" />
                  </div>
                  <p>Build and Earn with your online store with lots of cool and exclusive wpo-features </p>
                  <ul>
                    <li><a href="#"><i className="ti-facebook"></i></a></li>
                    <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                    <li><a href="#"><i className="ti-instagram"></i></a></li>
                    <li><a href="#"><i className="ti-google"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-md-3 col-sm-6">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Service</h3>
                  </div>
                  <ul>
                    <li><a href="#">Islamic School</a></li>
                    <li><a href="#">Our Causes</a></li>
                    <li><a href="#">Our Mission</a></li>
                    <li><Link href="/contact"><a>Contact Us</a></Link></li>
                    <li><a href="#">Our Event</a></li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-2 col-md-3 col-sm-6">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li><Link href="/about"><a>About Us</a></Link></li>
                    <li><Link href="/services"><a>Services</a></Link></li>
                    <li><Link href="/admin/sign-up"><a href="event.html">Sign Up</a></Link></li>
                    <li><Link href="/admin/login"><a>Login</a></Link></li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-lg-offset-1 col-md-3 col-sm-6">
                <div className="widget market-widget wpo-service-link-widget">
                  <div className="widget-title">
                    <h3>Contact </h3>
                  </div>
                  <div className="contact-ft">
                    <ul>
                      <li><i className="fi ti-location-pin"></i> 40 E 1 Shahrah-e-Hazrat Imam Hussain, Block E1 Block E 1 Gulberg III, Lahore, Punjab 54660</li>
                      <li><i className="fi flaticon-call"></i>(042) 35752716</li>
                      <li><i className="fi flaticon-envelope"></i>ncbae.edu.pk@gmail.com</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                <p className="copyright">&copy; 2022 Prayer Time. All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export {Footer};