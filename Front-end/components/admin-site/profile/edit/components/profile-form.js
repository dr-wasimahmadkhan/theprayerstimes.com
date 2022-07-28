import React, {useState} from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner, Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";

type Props = {
  values: any,
  errors: any,
  dirty: boolean,
  isSubmitting: boolean,
  handleChange: Function,
  handleBlur: Function,
  handleSubmit: Function,
  isLoadingSave: boolean,
  isView: boolean,
  buttonText: string,
  setFieldValue: any,
  is_admin: boolean,
};

const ProfileForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
    isView,
    buttonText,
    setFieldValue,
    is_admin,
  } = props;
  return (
    <Form>
      <h6 className="heading-small text-muted mb-4 mt-4">
        Profile Info
      </h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <Field name="full_name">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="full_name"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.full_name}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.full_name}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>

          <Col lg="6">
            <Field name="email">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                        Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="email"
                      disabled={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.email}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
        </Row>
      </div>
      <hr className="my-4"/>
      {!isView && (
        <Button
          className="btn-icon btn-3 my-4"
          color="primary float-right"
          type="button"
          disabled={!dirty || isSubmitting || isLoadingSave}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">
            {buttonText || 'Create'}
          </span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
          </span>
        </Button>
      )}
    </Form>
  );
};

export { ProfileForm };