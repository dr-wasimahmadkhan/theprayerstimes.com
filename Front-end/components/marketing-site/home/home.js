import React, { useState, useRef, useEffect } from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { SectionOne, RestSections, Mosques } from './component';
import reactQueryConfig from '@/constants/react-query-config';
import { useQuery } from 'react-query';
import { GET_ALL_MOSQUES } from '@/adminSite/mosque/queries';
import _get from 'lodash.get';
import MyComponent from 'react-fullpage-custom-loader';

type Props = {
  allRes: any,
};
const Home = (props: Props) => {
  const { allRes } = props;
  const myRef = useRef(null);
  const [isSearched, setIsSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page_no: 1,
    records_per_page: 10,
    is_populate: true,
    is_verified: true,
  });
  const {
    data: mosquesData,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_MOSQUES', searchParams], GET_ALL_MOSQUES, {
    ...reactQueryConfig,
  });

  useEffect(() => {
    if (isSearched) {
      executeScroll();
    }
  }, [_get(mosquesData, 'data', []), isSearched]);
  const executeScroll = () => myRef.current.scrollIntoView();
  const handleClearSearch = () => {
    setSearchParams({
      page_no: 1,
      records_per_page: 10,
      is_populate: true,
      is_verified: true,
    });
    setIsSearched(false);
  };
  return (
    <MarketingTemplate title="Home">
      <SectionOne
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Mosques
        isLoading={isLoading || isFetching}
        isError={isError}
        handleClearSearch={handleClearSearch}
        myRef={myRef}
        isSearched={isSearched}
        mosquesData={_get(mosquesData, 'data', [])}
      />
      {!isSearched && <RestSections />}
      {(isFetching || isLoading) && (
        <MyComponent width={'100%'} height={'100%'} />
      )}
    </MarketingTemplate>
  );
};
export default Home;
