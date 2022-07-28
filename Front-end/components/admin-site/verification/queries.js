// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
// Design Queries and Mutations Start

export const Verify = async data => {
  const res = await axios.post(`${baseURL}/v1/auth/verify`, data);
  return res?.data;
};
