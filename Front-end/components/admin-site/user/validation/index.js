import * as Yup from 'yup';
import {PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE, PHONE_NUMBER_REGEX} from "@/constants/regex";

export const validateCreateEmployeeForm = Yup.object().shape({
  full_name: Yup.string().required('Name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .required('Password is Mandatory'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
});