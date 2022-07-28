import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { EmployeeForm } from '../components';
import { Formik } from 'formik';
import {validateCreateEmployeeForm } from "@/adminSite/user/validation";
import {CREATE_USER} from "../queries";
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";
import _omit from 'lodash.omit';
import _get from 'lodash.get';

const CreateUser = () => {
  const {
    mutate: createEmployee,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_USER);
  const { user_id } = getLocalStorageValues();
  return (
    <SecureTemplate title="Create Employee">
      <FormHeader heading="Create Employee" />
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          password: "",
          confirm_password: "",
          role: "customer_care",
          is_verified: true,
        }}
        validationSchema={validateCreateEmployeeForm}
        onSubmit={async (values, actions) => {
          await createEmployee(
            _omit(values, 'confirm_password'), {
              onSuccess: res => {
                Message.success(res);
                Router.push(
                  "/admin/management",
                  "/admin/management",
                  { shallow: true },
                );
              },
              onError: err => {
                Message.error(err);
                actions.resetForm();
              },
            });
        }}
      >
        {formikProps => {
          return (
            <EmployeeForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateUser;