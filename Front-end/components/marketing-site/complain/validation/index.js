import * as Yup from 'yup';

export const validateContactForm = Yup.object().shape({
  full_name: Yup.string().required('Name is mandatory'),
  email: Yup.string().required('Email is mandatory'),
  subject: Yup.string().required('Subject is mandatory'),
  message: Yup.string().required('Message is mandatory'),
  mosque_id: Yup.object().shape({
    _id: Yup.string().required('Mosque is mandatory'),
  }),
});