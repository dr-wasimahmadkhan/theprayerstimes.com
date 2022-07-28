import React, { useState } from 'react';
import _get from 'lodash.get';
import moment from 'moment';
import AllMosques from './all-mosques';

type Props = {
  isSearched: boolean,
  mosquesData: any,
  myRef: any,
  handleClearSearch: any,
  isError: boolean,
  isLoading: boolean,
};

const Mosques = (props: Props) => {
  const {
    myRef,
    isLoading = false,
    mosquesData = [],
    isError = false,
    isSearched = false,
    handleClearSearch,
  } = props;

  return (
    <div className="wpo-about-area section-padding">
      <div className="wpo-section-title">
        <span>Mosques</span>
        <h2>{isSearched ? 'Searched Mosques' : 'Already Registered!'}</h2>
      </div>
      <div className="container text-center">
        <div className="row" ref={myRef}>
          {mosquesData.map((mosque, i) => (
            <AllMosques mosque={mosque} key={i} />
          ))}
        </div>
        {!isLoading && isSearched && (isError || mosquesData.length === 0) && (
          <p>No Searched Found. Search Again or clear search!</p>
        )}
        {!isLoading && !isSearched && (isError || mosquesData.length === 0) && (
          <p>No Mosque Registered Yet!</p>
        )}
        {!isLoading && isSearched && (
          <button
            className="btn btn-primary text-center"
            style={{ marginTop: '20px' }}
            type="button"
            onClick={handleClearSearch}>
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export { Mosques };
