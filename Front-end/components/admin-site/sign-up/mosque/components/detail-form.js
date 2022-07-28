import React, { useEffect } from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { fieldValidateBool } from "@/components/utils/form";
import { State, City }  from 'country-state-city';
import "react-datepicker/dist/react-datepicker.css";
import { Field } from "formik";
import ReactSelect from "@/components/react-select";
import GoogleMapMain from '@/components/google-map';
import Geocode from 'react-geocode';
import { googleGeoCodeApi } from '@/constants/env';
const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${googleGeoCodeApi}&v=3.exp&libraries=geometry,drawing,places`;
Geocode.setApiKey(googleGeoCodeApi);
// @ts-ignore
Geocode.setLocationType('ROOFTOP');

type Props = {
    values: any,
    errors: any,
    dirty: boolean,
    isSubmitting: boolean,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isLoadingSave: boolean,
    setFieldValue: any,
};

const MosqueDetailForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
    setFieldValue,
  } = props;
  const states = State.getStatesOfCountry('PK');
  const cities = City.getCitiesOfState('PK', values?.state?.isoCode);
  useEffect(() => {
    Geocode.fromAddress(`${values.address} ${values.state.isoCode} ${values.city.name} Pakistan`).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setFieldValue('lon', lng);
        setFieldValue('lat', lat);
      },
      error => {
        setFieldValue('lon', 0);
        setFieldValue('lat', 0);
      },
    );
  }, [values.address, values.state?.isoCode, values.city?.name]);
  return (
    <Form role="form">
      <Row>
        <Col lg="6">
          <Field name="name">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
               Mosque Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Mosque Name"
                    type="text"
                    name="name"
                    disabled={isLoadingSave}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    invalid={fieldValidateBool(field, form)}
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.name}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
        <Col lg="6">
          <Field name="type">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                  Type
                  </label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/*<InputGroupText>*/}
                      {/*  <i className="ni ni-lock-circle-open" />*/}
                      {/*</InputGroupText>*/}
                    </InputGroupAddon>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder="Type"
                      type="text"
                      name="type"
                      disabled={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      invalid={fieldValidateBool(field, form)}
                    />
                  </InputGroup>
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.type}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <Field name="state">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                            State
                  </label>
                  <ReactSelect
                    isMulti={false}
                    isSearchable={true}
                    isCreateable={false}
                    defaultValue={values.stateObj}
                    isDisabled={isLoadingSave}
                    options={states || []}
                    getOptionLabel="name"
                    getOptionValue="isoCode"
                    placeholder="Select State"
                    handleChange={value => {
                      form.setFieldValue(
                        field.name, value, true,
                      );
                      form.setFieldValue(
                        "city", {}, true,
                      );
                    }}
                    handleBlur={handleBlur}
                    // isLoading={isUserDataLoading}
                    classes="react-msd"
                    noOptionsMessage={() => (
                      <div className="no-results">
                    No States found
                      </div>
                    )}
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.state.isoCode}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
        <Col lg="6">

          <Field name="city">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
              City
                  </label>
                  <ReactSelect
                    isMulti={false}
                    isCreateable={false}
                    defaultValue={values.cityObj}
                    isDisabled={isLoadingSave}
                    options={cities || []}
                    getOptionLabel="name"
                    getOptionValue="name"
                    isSearchable={true}
                    placeholder="Select City"
                    handleChange={value => {
                      form.setFieldValue(
                        field.name, value, true,
                      );
                    }}
                    handleBlur={handleBlur}
                    // isLoading={isUserDataLoading}
                    classes="react-msd"
                    noOptionsMessage={() => (
                      <div className="no-results">
                  No City found
                      </div>
                    )}
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.city.name}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Field name="address">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username">
                            Address
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder="Address"
                      type="text"
                      name="address"
                      disabled={isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      invalid={fieldValidateBool(field, form)}
                    />
                  </InputGroup>
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.address}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="google-map-code">
            <GoogleMapMain
              values={values}
              googleMapURL={googleMapUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `282px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
      </Row>
      <div className="text-center">
        <Button
          className="btn-icon btn-3 my-4"
          color="primary"
          type="button"
          disabled={!dirty || isSubmitting || isLoadingSave}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">Next</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
          </span>
        </Button>
      </div>
    </Form>
  );
};
export {MosqueDetailForm};