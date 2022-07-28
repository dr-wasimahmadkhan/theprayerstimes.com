import React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { fieldValidateBool } from "@/components/utils/form";
import "react-datepicker/dist/react-datepicker.css";
import { Field } from "formik";
import DatePicker from 'react-datepicker';

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

const TimingForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleBlur,
    handleSubmit,
    isLoadingSave,
  } = props;
  return (
    <Form role="form">
      <Row>
        <Col lg="6">
          <Field name="fajr">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                      Fajr
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.fajr}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.fajr}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
        <Col lg="6">
          <Field name="dhuhr">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                Dhuhr
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.dhuhr}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.dhuhr}
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
          <Field name="asr">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                Asr
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.asr}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.asr}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
        <Col lg="6">
          <Field name="maghrib">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                  Maghrib
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.maghrib}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.maghrib}
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
          <Field name="isha">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                    Isha
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.isha}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.isha}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
        </Col>
        <Col lg="6">
          <Field name="jummah">
            {({field, form}) => {
              return (
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                                  Jummah
                  </label>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    selected={values.jummah}
                    onChange={date =>
                      form.setFieldValue(field.name, date, true)
                    }
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isLoadingSave}
                    onBlur={handleBlur}
                    className="form-control-alternative
                                 event-date-picker"
                  />
                  {fieldValidateBool(field, form) && (
                    <FormFeedback>
                      {errors.jummah}
                    </FormFeedback>
                  )}
                </FormGroup>
              );
            }}
          </Field>
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
          <span className="btn-inner--text">Save</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
          </span>
        </Button>
      </div>
    </Form>
  );
};
export {TimingForm};