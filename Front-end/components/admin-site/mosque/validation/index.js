import * as Yup from 'yup';

export const validateTimingForm = Yup.object().shape({
  fajr: Yup.date().required('Fajr Time is mandatory'),
  dhuhr: Yup.date().required('Dhuhr Time is mandatory'),
  jummah: Yup.date().required('Jummah Time is mandatory'),
  asr: Yup.date().required('Asr Time is mandatory'),
  maghrib: Yup.date().required('Maghrib Time is mandatory'),
  isha: Yup.date().required('Isha Time is mandatory'),
  updated_by: Yup.string().required('User ID is mandatory'),
});


export const validateMosqueImageForm = Yup.object().shape({
  mosque_images: Yup.array().min(1, 'At least One image is Required'),
  updated_by: Yup.string().required('User ID is mandatory'),
});