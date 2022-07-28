import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { useQuery } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {MosqueView}  from '../components';
import { GET_MOSQUE_BY_ID, GET_TIMING_BY_MOSQUE_ID } from '../queries';

const ViewMosque = () => {
  const router = useRouter();
  const { mosqueId } = router.query;
  const isEnabled = mosqueId !== undefined;
  const {
    data: mosqueData,
    isLoading,
  } = useQuery(['MOSQUE_BY_ID', { mosqueId }], GET_MOSQUE_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
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
  return (
    <SecureTemplate title="View Mosque">
      <FormHeader heading="View Mosque" />
      <MosqueView mosqueData={_get(mosqueData, 'data', {})} timingData={_get(timingData, 'data', {})} />
      {(isLoading || isLoadingTiming) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewMosque;