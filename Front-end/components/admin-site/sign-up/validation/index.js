import * as Yup from 'yup';
import { PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE } from '@/constants/regex';

export const validateSignUpForm = Yup.object().shape({
  full_name: Yup.string().required('Full Name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .required('Password is Mandatory'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
});

export const validateMosqueForm = Yup.object().shape({
  name: Yup.string().required('Mosque Name is mandatory'),
  city: Yup.object().shape({
    name: Yup.string().required('City is mandatory'),
  }),
  state: Yup.object().shape({
    isoCode: Yup.string().required('State is mandatory'),
  }),
  address: Yup.string().required('Address is mandatory'),
  type: Yup.string().required('Type is mandatory'),
  lat: Yup.number().required('Latitude is mandatory'),
  lon: Yup.number().required('Longitude is mandatory'),
  user_id: Yup.string().required('User ID is mandatory'),
  created_by: Yup.string().required('User ID is mandatory'),
});

export const validateTimingForm = Yup.object().shape({
  fajr: Yup.date().required('Fajr Time is mandatory'),
  dhuhr: Yup.date().required('Dhuhr Time is mandatory'),
  jummah: Yup.date().required('Jummah Time is mandatory'),
  asr: Yup.date().required('Asr Time is mandatory'),
  maghrib: Yup.date().required('Maghrib Time is mandatory'),
  isha: Yup.date().required('Isha Time is mandatory'),
  created_by: Yup.string().required('User ID is mandatory'),
});