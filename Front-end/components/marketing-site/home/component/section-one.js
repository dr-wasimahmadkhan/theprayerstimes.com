import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { fieldValidateBool } from '@/utils/form';
import parseAddress from 'parse-address-string';
import _get from 'lodash.get';
import Geocode from 'react-geocode';
import { googleGeoCodeApi } from '@/constants/env';
const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${googleGeoCodeApi}&v=3.exp&libraries=geometry,drawing,places`;
Geocode.setApiKey(googleGeoCodeApi);
// @ts-ignore
Geocode.setLocationType('ROOFTOP');
type Props = {
  isSearched: boolean,
  setIsSearched: boolean,
  searchParams: any,
  setSearchParams: any,
};
const SectionOne = (props: Props) => {
  const { isSearched, setIsSearched, searchParams, setSearchParams } = props;
  return (
    <section className="hero hero-style-3">
      <div className="hero-slider">
        <div className="slide">
          <div className="container">
            <div className="row">
              <div className="col col-lg-8 col-md-7 slide-caption">
                <div className="slide-top">
                  <span>Let’s Know Islam</span>
                </div>
                <div className="slide-title">
                  <h2>Read! In the Name of your Lord, Who has created</h2>
                </div>
                <div className="slide-subtitle">
                  <p>
                    We are the best Mosque Finder. Let’s know about prayer and
                    your location <br /> to find a mosque near you
                  </p>
                </div>
                {/*<div className="btns">*/}
                {/*  <a href="about.html" className="theme-btn">Discover More</a>*/}
                {/*</div>*/}
                <section
                  className="wpo-news-letter-section"
                  style={{ marginTop: '20px', width: '90%' }}>
                  <div className="">
                    <div className="wpo-newsletter">
                      <div className="wpo-newsletter-form">
                        <Formik
                          initialValues={{
                            inputSearch: '',
                          }}
                          validationSchema={Yup.object().shape({
                            inputSearch: Yup.string().required(
                              'Please enter required field to search',
                            ),
                          })}
                          onSubmit={async (values, actions) => {
                            Geocode.fromAddress(
                              `${values.inputSearch} Pakistan`,
                            ).then(
                              response => {
                                const { lat, lng } =
                                  response.results[0].geometry.location;
                                console.log(lat, lng);
                                setSearchParams({
                                  ...searchParams,
                                  lat: lat,
                                  lng: lng,
                                });
                              },
                              error => {
                                setSearchParams({
                                  ...searchParams,
                                  lat: 0,
                                  lng: 0,
                                });
                              },
                            );
                            // parseAddress(
                            //   values.inputSearch,
                            //   function (err, addressObj) {
                            //     setSearchParams({
                            //       ...searchParams,
                            //       city: _get(addressObj, 'city', ''),
                            //       state: _get(addressObj, 'state', ''),
                            //       address:
                            //         _get(addressObj, 'street_address1') ||
                            //         values.inputSearch,
                            //     });
                            //   },
                            // );
                            setIsSearched(true);
                            actions.resetForm();
                          }}>
                          {formikProps => {
                            return (
                              <form
                                style={{ maxWidth: 'initial' }}
                                className="contact-validation-active">
                                <Field name="inputSearch">
                                  {({ field, form }) => {
                                    return (
                                      <div>
                                        <input
                                          type="text"
                                          value={formikProps.values.inputSearch}
                                          onChange={formikProps.handleChange}
                                          onBlur={formikProps.handleBlur}
                                          placeholder="Enter Your Location Or Just Click Search to set current location"
                                          className="form-control error"
                                          name="inputSearch"
                                        />
                                        {fieldValidateBool(field, form) && (
                                          <label
                                            id="name-error"
                                            className="error"
                                            htmlFor="name">
                                            {formikProps.errors.inputSearch}
                                          </label>
                                        )}
                                        <button
                                          type="button"
                                          onClick={formikProps.handleSubmit}>
                                          Search
                                        </button>
                                      </div>
                                    );
                                  }}
                                </Field>
                              </form>
                            );
                          }}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="right-vec">
            <img src="/marketing/images/slider/img-2.png" alt="" />
            <div className="right-border">
              <div className="right-icon">
                <i className="fi flaticon-quran"></i>
              </div>
              <div className="right-icon">
                <i className="fi flaticon-taj-mahal-1"></i>
              </div>
              <div className="right-icon">
                <i className="fi flaticon-allah-word"></i>
              </div>
              <div className="right-icon">
                <i className="fi flaticon-muhammad-word"></i>
              </div>
              <div className="right-icon">
                <i className="fi flaticon-prayer"></i>
              </div>
              <div className="right-icon">
                <i className="fi flaticon-business-and-finance"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export { SectionOne };
