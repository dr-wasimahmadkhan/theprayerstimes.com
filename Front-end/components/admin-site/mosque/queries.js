// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

// export const CREATE_MOSQUE = async data => {
//   const res = await axios.post(`${baseURL}/v1/mosque`, data);
//   return res?.data;
// };

export const GET_ALL_MOSQUES = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/mosque/all-mosques`,
    { params: params },
  );
  return res?.data;
};

export const GET_MOSQUE_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/mosque/${params.mosqueId}`);
  return res?.data;
};

export const GET_MOSQUE_BY_USER_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/mosque/user/${params.userId}`);
  return res?.data;
};

export const GET_TIMING_BY_MOSQUE_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/timing/mosque-id/${params.mosqueId}`);
  return res?.data;
};

export const UPDATE_MOSQUE = async data => {
  const res = await axios.patch(`${baseURL}/v1/mosque/${data.id}`, data.data);
  return res?.data;
};

export const UPDATE_TIMING = async data => {
  const res = await axios.patch(`${baseURL}/v1/timing/${data.id}`, data.data);
  return res?.data;
};

export const DELETE_MOSQUE = async mosqueId => {
  const res = await axios.delete(`${baseURL}/v1/mosque/${mosqueId}`);
  return res?.data;
};

export const UPDATE_STORAGE_FILE = async fileId => {
  const res = await axios.patch(`${baseURL}/v1/storage-file/${fileId}`);
  return res?.data;
};
