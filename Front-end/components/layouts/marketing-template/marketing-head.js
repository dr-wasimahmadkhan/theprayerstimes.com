import React from 'react';
import Head from 'next/head';

const MarketingHead = ({ title }) => {
  return (
    <Head>
      <title>{title || "Prayer Times"}</title>
      <link href="/marketing/css/themify-icons.css" rel="stylesheet" />
      <link href="/marketing/css/font-awesome.min.css" rel="stylesheet" />
      <link href="/marketing/css/flaticon.css" rel="stylesheet" />
      <link href="/marketing/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/marketing/css/animate.css" rel="stylesheet" />
      <link href="/marketing/css/owl.carousel.css" rel="stylesheet" />
      <link href="/marketing/css/owl.theme.css" rel="stylesheet" />
      <link href="/marketing/css/slick.css" rel="stylesheet" />
      <link href="/marketing/css/slick-theme.css" rel="stylesheet" />
      <link href="/marketing/css/swiper.min.css" rel="stylesheet" />
      <link href="/marketing/css/owl.transitions.css" rel="stylesheet" />
      <link href="/marketing/css/jquery.fancybox.css" rel="stylesheet" />
      <link href="/marketing/css/odometer-theme-default.css" rel="stylesheet" />
      <link href="/marketing/css/nice-select.css" rel="stylesheet" />
      <link href="/marketing/css/style.css" rel="stylesheet" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js" />
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js" />
      <script src="/marketing/js/jquery.min.js" />
      <script src="/marketing/js/bootstrap.min.js" />
      <script src="/marketing/js/circle-progress.min.js" />
      <script src="/marketing/js/jquery-plugin-collection.js" />
      <script src="/marketing/js/script.js" />
    </Head>
  );
};

export default MarketingHead;
