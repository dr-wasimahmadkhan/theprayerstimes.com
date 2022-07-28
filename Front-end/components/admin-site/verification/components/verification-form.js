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
} from "reactstrap";
import { fieldValidateBool } from "@/components/utils/form";
import { Field } from "formik";
import { Spinner } from "reactstrap";

type Props = {
  values: any,
  errors: any,
  dirty: boolean,
  isSubmitting: boolean,
  handleChange: Function,
  handleBlur: Function,
  handleSubmit: Function,
  isLoadingLogin: boolean,
};

const VerificationForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingLogin,
  } = props;
  return (
    <Form role="form">
      <Field name="verification_code">
        {({field, form}) => {
          return (
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="xyz"
                  type="text"
                  name="verification_code"
                  disabled={isLoadingLogin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.verification_code}
                  invalid={fieldValidateBool(field, form)}
                />
              </InputGroup>
              {fieldValidateBool(field, form) && (
                <FormFeedback>
                  {errors.verification_code}
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
          disabled={!dirty || isSubmitting || isLoadingLogin}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">Verify</span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingLogin) && <Spinner size="sm"/>}
          </span>
        </Button>
      </div>
    </Form>
  );
};

export { VerificationForm };