import React, {useContext} from 'react';
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import TemplateContext from "@/layouts/secure-template/context";
import { validateUpdateProfileForm} from '../validation';
import { ProfileForm } from "./index";
import {ProcessingModal} from "@/components/modal";
import { UPDATE_USER_DATA } from '../../queries';
import { useMutation } from "react-query";
import {City, State} from "country-state-city";
import _omit from "lodash.omit";

const Profile = () => {
  const {
    mutate: updateUserData,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_USER_DATA);
  const {
    userData,
    isLoadingUserData,
    refetchUserData,
  } = useContext(TemplateContext);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          full_name: _get(userData, 'full_name', ''),
          email: _get(userData, 'email', ''),
        }}
        validationSchema={validateUpdateProfileForm}
        onSubmit={async (values, actions) => {
          await updateUserData({
            id: _get(userData, '_id', ''),
            data: _omit(values, 'confirm_password', 'email'),
          }, {
            onSuccess: async res => {
              await refetchUserData();
              Message.success(res);
              actions.resetForm();
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
            <ProfileForm
              {...formikProps}
              isLoadingSave={isLoadingUserData || isLoadingSave}
              buttonText="Update"
              is_admin={_get(userData, 'is_admin', false)}
            />
          );
        }}
      </Formik>
      {(isLoadingUserData || isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { Profile };