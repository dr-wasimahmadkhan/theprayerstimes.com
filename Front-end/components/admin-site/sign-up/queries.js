// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
// Design Queries and Mutations Start

export const SIGNUP = async data => {
  const res = await axios.post(`${baseURL}/v1/user`, data);
  return res?.data;
};

export const ADD_MOSQUE = async data => {
  const res = await axios.post(`${baseURL}/v1/mosque`, data);
  return res?.data;
};

export const ADD_TIMINGS = async data => {
  const res = await axios.post(`${baseURL}/v1/timing`, data);
  return res?.data;
};
