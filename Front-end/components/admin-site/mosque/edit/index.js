import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { useQuery, useMutation } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {MosqueForm}  from '../components';
import { UPDATE_TIMING, GET_TIMING_BY_MOSQUE_ID } from '../queries';
import {Formik} from "formik";
import {validateTimingForm} from "../validation";
import {getLocalStorageValues} from "@/constants/local-storage";
import moment from "moment";

const EditMosque = () => {
  const router = useRouter();
  const { user_id } = getLocalStorageValues();
  const { mosqueId } = router.query;
  const isEnabled = mosqueId !== undefined;
  const { mutate: updateTiming, isLoading: isLoadingSave} = useMutation(UPDATE_TIMING);
  const {
    data: timingData,
    isLoading: isLoadingTiming,
  } = useQuery(['TIMING_BY_MOSQUE_ID', { mosqueId }], GET_TIMING_BY_MOSQUE_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  console.log("timingData", timingData);
  return (
    <SecureTemplate title="Edit Mosque">
      <FormHeader heading="Edit Mosque" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          fajr: _get(timingData, 'data.fajr') ? moment(_get(timingData, 'data.fajr')).toDate() : new Date(),
          dhuhr: _get(timingData, 'data.dhuhr') ? moment(_get(timingData, 'data.dhuhr')).toDate() : new Date(),
          jummah: _get(timingData, 'data.jummah') ? moment(_get(timingData, 'data.jummah')).toDate() : new Date(),
          asr: _get(timingData, 'data.asr') ? moment(_get(timingData, 'data.asr')).toDate() : new Date(),
          maghrib: _get(timingData, 'data.maghrib') ? moment(_get(timingData, 'data.maghrib')).toDate() : new Date(),
          isha: _get(timingData, 'data.isha') ? moment(_get(timingData, 'data.isha')).toDate() : new Date(),
          updated_by: user_id,
        }}
        validationSchema={validateTimingForm}
        onSubmit={async (values, actions) => {
          await updateTiming({
            id: _get(timingData, 'data._id', ''),
            data: values,
          }, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/mosques",
                "/admin/mosques",
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
            <MosqueForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoadingTiming) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditMosque;