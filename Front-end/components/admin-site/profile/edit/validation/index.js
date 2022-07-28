import * as Yup from 'yup';
import { PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE} from "@/constants/regex";

export const validateUpdateProfileForm = Yup.object().shape({
  full_name: Yup.string().required('Name is mandatory'),
  email: Yup.string().email().required('Email is mandatory'),
});

export const validateUpdateAboutForm = Yup.object().shape({
  heading: Yup.string().required('Heading is mandatory'),
  description: Yup.string().required('Description is mandatory'),
});

export const validateUpdatePassForm = Yup.object().shape({
  old_password: Yup.string()
    .required('Old Password is required')
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  password: Yup.string()
    .required('Password is required')
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
});
