import React from 'react';
import {FormHeader} from "@/adminSite/common";
import SecureTemplate from "@/layouts/secure-template";
import {UserData} from "@/adminSite/profile/component";
import { useQuery } from "react-query";
import {GET_MOSQUE_BY_USER_ID, GET_TIMING_BY_MOSQUE_ID} from './queries';
import {getLocalStorageValues} from "@/constants/local-storage";
import Router from 'next/router';
import reactQueryConfig from "@/constants/react-query-config";
import {Message} from "@/components/alert/message";
import _get from 'lodash.get';
import {MosqueView} from "@/adminSite/mosque/components";
import {ProcessingModal} from "@/components/modal";

const UserMosque = () => {
  const { user_id } = getLocalStorageValues();
  const { data: mosqueData, isLoading} = useQuery(['MOSQUE_BY_USER_ID', {userId: user_id}],
    GET_MOSQUE_BY_USER_ID, {
      onError: () => {
        Router.push('/admin/dashboard', '/admin/dashboard');
      },
    });
  const isEnabled = typeof _get(mosqueData, 'data._id', null) === 'string';
  const {
    data: timingData,
    isLoading: isLoadingTiming,
  } = useQuery(['TIMING_BY_MOSQUE_ID', { mosqueId: _get(mosqueData, 'data._id', '') }], GET_TIMING_BY_MOSQUE_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
    },
  });
  const handleEditMosque = () => {
    Router.push(
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/edit`,
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/edit`,
      { shallow: true },
    );
  };
  const handleEditMosqueImages = () => {
    Router.push(
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/images`,
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/images`,
      { shallow: true },
    );
  };
  const handleAddAdditionalInfo = () => {
    Router.push(
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/additional-info`,
      `/admin/mosque/${_get(mosqueData, 'data._id', '')}/additional-info`,
      { shallow: true },
    );
  }
  return (
    <SecureTemplate title="Mosque">
      <FormHeader isMosque={true} handleEditMosque={handleEditMosque} handleEditMosqueImages={handleEditMosqueImages} handleAddAdditionalInfo={handleAddAdditionalInfo} />
      <MosqueView mosqueData={_get(mosqueData, 'data', {})} timingData={_get(timingData, 'data', {})} />
      {(isLoading || isLoadingTiming) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default UserMosque;