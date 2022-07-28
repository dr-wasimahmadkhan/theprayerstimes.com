import React from 'react';
import SecureTemplate from '@/layouts/secure-template';
import { FormHeader } from '@/adminSite/common';
import { useQuery, useMutation } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import Router, { useRouter } from 'next/router';
import { Message } from '@/components/alert/message';
import _get from 'lodash.get';
import { ProcessingModal } from '@/components/modal';
import { MosqueImageForm } from '../components';
import { UPDATE_MOSQUE, GET_TIMING_BY_MOSQUE_ID } from '../queries';
import { Formik } from 'formik';
import { validateMosqueImageForm } from '../validation';
import { getLocalStorageValues } from '@/constants/local-storage';
import moment from 'moment';
import { GET_MOSQUE_BY_ID } from '../queries';

const MosqueImagesEdit = ({ is_admin }) => {
  const router = useRouter();
  const { user_id } = getLocalStorageValues();
  const { mosqueId } = router.query;
  const isEnabled = mosqueId !== undefined;
  const { mutate: updateMosque, isLoading: isLoadingSave } =
    useMutation(UPDATE_MOSQUE);
  const { data: mosqueData, isLoading } = useQuery(
    ['MOSQUE_BY_ID', { mosqueId }],
    GET_MOSQUE_BY_ID,
    {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: err => {
        Message.error(err);
        //   router.back();
      },
    },
  );
  console.log('mosqueData', mosqueData);
  return (
    <SecureTemplate title="Edit Mosque">
      <FormHeader heading="Edit Mosque" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          mosque_images: _get(mosqueData, 'data.mosque_images', []),
          name: _get(mosqueData, 'data.name', ''),
          updated_by: user_id,
        }}
        validationSchema={validateMosqueImageForm}
        onSubmit={async (values, actions) => {
          await updateMosque(
            {
              id: _get(mosqueData, 'data._id', ''),
              data: values,
            },
            {
              onSuccess: res => {
                Message.success(res);
                if (!is_admin) {
                  Router.push('/admin/mosque', '/admin/mosque', {
                    shallow: true,
                  });
                } else {
                  Router.push('/admin/mosques', '/admin/mosques', {
                    shallow: true,
                  });
                }
              },
              onError: err => {
                Message.error(err);
                actions.resetForm();
              },
            },
          );
        }}>
        {formikProps => {
          return (
            <MosqueImageForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );
        }}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default MosqueImagesEdit;
