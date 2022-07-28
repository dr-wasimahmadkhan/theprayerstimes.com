import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Row,
  Input,
  Spinner,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { Field } from 'formik';
import { fieldValidateBool } from '@/utils/form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
const MosqueAdditionalInfoForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    isLoadingSave,
  } = props;
  console.log('values.fajr', values.fajr);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <div className="pl-lg-4">
                <h6 className="heading-small text-muted mb-4">
                  Additional Information
                </h6>
                <Form role="form">
                  <Row>
                    <Col lg="6">
                      <Field name="is_eid_ul_fitr">
                        {({ field, form }) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"></label>
                              <Input
                                aria-label="Checkbox for following text input"
                                type="checkbox"
                                onChange={handleChange}
                                name="is_eid_ul_fitr"
                                disabled={isLoadingSave}
                                checked={values.is_eid_ul_fitr}
                                className="form-control-alternative"
                                style={{ marginLeft: 'auto' }}
                              />
                              <span style={{ marginLeft: '20px' }}>
                                Eid-ul-Fitr
                              </span>
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      {values.is_eid_ul_fitr && (
                        <Field name="eid_ul_fitr_timing">
                          {({ field, form }) => {
                            return (
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username">
                                  Eid-Ul-Fitr Timing
                                </label>
                                <DatePicker
                                  showTimeSelect
                                  showTimeSelectOnly
                                  selected={values.eid_ul_fitr_timing}
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
                                    {errors.eid_ul_fitr_timing}
                                  </FormFeedback>
                                )}
                              </FormGroup>
                            );
                          }}
                        </Field>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <Field name="is_eid_ul_adha">
                        {({ field, form }) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"></label>
                              <Input
                                aria-label="Checkbox for following text input"
                                type="checkbox"
                                onChange={handleChange}
                                name="is_eid_ul_adha"
                                disabled={isLoadingSave}
                                checked={values.is_eid_ul_adha}
                                className="form-control-alternative"
                                style={{ marginLeft: 'auto' }}
                              />
                              <span style={{ marginLeft: '20px' }}>
                                Eid-ul-Adha
                              </span>
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      {values.is_eid_ul_adha && (
                        <Field name="eid_ul_fitr_timing">
                          {({ field, form }) => {
                            return (
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username">
                                  Eid-Ul-Adha Timing
                                </label>
                                <DatePicker
                                  showTimeSelect
                                  showTimeSelectOnly
                                  selected={values.eid_ul_adha_timing}
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
                                    {errors.eid_ul_adha_timing}
                                  </FormFeedback>
                                )}
                              </FormGroup>
                            );
                          }}
                        </Field>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <Field name="is_tarawih">
                        {({ field, form }) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"></label>
                              <Input
                                aria-label="Checkbox for following text input"
                                type="checkbox"
                                onChange={handleChange}
                                name="is_tarawih"
                                disabled={isLoadingSave}
                                checked={values.is_tarawih}
                                className="form-control-alternative"
                                style={{ marginLeft: 'auto' }}
                              />
                              <span style={{ marginLeft: '20px' }}>
                                Tarawih
                              </span>
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      {values.is_tarawih && (
                        <Field name="tarawih_timing">
                          {({ field, form }) => {
                            return (
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username">
                                  Tarawih Timing
                                </label>
                                <DatePicker
                                  showTimeSelect
                                  showTimeSelectOnly
                                  selected={values.tarawih_timing}
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
                                    {errors.tarawih_timing}
                                  </FormFeedback>
                                )}
                              </FormGroup>
                            );
                          }}
                        </Field>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <Field name="is_itikaf">
                        {({ field, form }) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"></label>
                              <Input
                                aria-label="Checkbox for following text input"
                                type="checkbox"
                                onChange={handleChange}
                                name="is_itikaf"
                                disabled={isLoadingSave}
                                checked={values.is_itikaf}
                                className="form-control-alternative"
                                style={{ marginLeft: 'auto' }}
                              />
                              <span style={{ marginLeft: '20px' }}>Itikaf</span>
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  <div className="text-left">
                    <Button
                      className="btn-icon btn-3 my-4"
                      color="primary"
                      type="button"
                      disabled={!dirty || isSubmitting || isLoadingSave}
                      onClick={handleSubmit}>
                      <span className="btn-inner--text">Update</span>
                      <span className="btn-inner--icon">
                        {(isSubmitting || isLoadingSave) && (
                          <Spinner size="sm" />
                        )}
                      </span>
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { MosqueAdditionalInfoForm };
