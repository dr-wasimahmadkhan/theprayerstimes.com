import * as Yup from 'yup';

export const validateVerificationForm = Yup.object().shape({
  verification_code: Yup.string().required('Verification Code is mandatory'),
  user_id: Yup.string().required('User Id is mandatory'),
});