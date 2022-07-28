import _get from "lodash.get";
import axios from "axios";
import {baseURL} from "@/constants/env";

export const GET_ABOUT_DATA = async key => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/about`,
    { params: params },
  );
  return res?.data;
};

export const UPDATE_USER_DATA = async data => {
  const res = await axios.patch(`${baseURL}/v1/user/${data.id}`,
    data.data,
  );
  return res?.data;
};

export const UPDATE_ABOUT_DATA = async data => {
  const res = await axios.patch(`${baseURL}/v1/about/${data.id}`,
    data.data,
  );
  return res?.data;
};

export const UPDATE_PASSWORD = async data => {
  const res = await axios.patch(`${baseURL}/v1/auth/update-password`,
    data,
  );
  return res?.data;
};