import React, { useState } from 'react';
import MarketingHead from './marketing-head';
import { Header, Footer } from './components';
import Router from 'next/router';
import { FrontendLoader } from '@/components/loaders';

type Props = {
  children: any,
  title: String,
};
const MarketingTemplate = (props: Props) => {
  const { children, title } = props;
  const [isRouting, setIsRouting] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setIsRouting(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsRouting(false);
  });
  Router.events.on('routeChangeError', () => {
    setIsRouting(false);
  });
  return (
    <>
      <MarketingHead  title={title}  />
      <div className="page-wrapper">
        {isRouting && <FrontendLoader />}
        <Header/>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default MarketingTemplate;
