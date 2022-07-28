import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';

const Services = () => {
  return (
    <MarketingTemplate title="Services">
      <div className="wpo-breadcumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Service</h2>
                <ul>
                  <li><a href="index.html">Home</a>
                  </li>
                  <li><span>Service</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-area-3 section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title">
                <span>What We Offer</span>
                <h2>Our Populer Services</h2>
              </div>
            </div>
          </div>
          <div className="service-wrap">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-3.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Quran Memorization</a></h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-4.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Special Child Care</a></h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-5.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Mosque Development</a></h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-6.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Matrimonial</a></h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-7.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Funerals</a></h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src="/marketing/images/service/img-8.png" alt=""/>
                  </div>
                  <div className="service-text">
                    <h2><a href="service-single.html">Help Poor</a></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingTemplate>
  );
};
export default Services;