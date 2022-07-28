import React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { fieldValidateBool } from "@/components/utils/form";
import { Field } from "formik";

type Props = {
  values: any,
  errors: any,
  dirty: boolean,
  isSubmitting: boolean,
  handleChange: Function,
  handleBlur: Function,
  handleSubmit: Function,
  isLoadingSignUp: boolean,
};

const SignUpForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSignUp,
  } = props;
  return (
    <Form role="form">
      <Field name="full_name">
        {({field, form}) => {
          return (
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username"
              >
                  Full Name
              </label>
              <Input
                className="form-control-alternative"
                id="input-username"
                placeholder="Full Name"
                type="text"
                name="full_name"
                disabled={isLoadingSignUp}
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
      <Field name="email">
        {({field, form}) => {
          return (
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username">
                  Email
              </label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="John@gmail.com"
                  type="text"
                  name="email"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>
                  {errors.email}
                </FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <Field name="password">
        {({field, form}) => {
          return (
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username"
              >
                  Password
              </label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="******"
                  type="password"
                  name="password"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>
                  {errors.password}
                </FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <Field name="confirm_password">
        {({field, form}) => {
          return (
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username"
              >
                  Confirm Password
              </label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="******"
                  type="password"
                  name="confirm_password"
                  disabled={isLoadingSignUp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>
                  {errors.confirm_password}
                </FormFeedback>
              )}
            </FormGroup>
          );
        }}
      </Field>
      <div className="text-center">
        <Button
          className="btn-icon btn-3 my-4"
          color="primary"
          type="button"
          disabled={!dirty || isSubmitting || isLoadingSignUp}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">Sign Up</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSignUp) && <Spinner size="sm"/>}
          </span>
        </Button>
      </div>
    </Form>
  );
};
export {SignUpForm};