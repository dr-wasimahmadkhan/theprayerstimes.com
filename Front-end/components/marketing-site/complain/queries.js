import axios from "axios";
import {baseURL} from "@/constants/env";

export const CREATE_CONTACT = async data => {
  const res = await axios.post(`${baseURL}/v1/contact`, data);
  return res?.data;
};