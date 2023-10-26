import * as yup from 'yup';

export const passengerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  passport_number: yup.string().required(),
  nationality: yup.string().nullable(),
  date_of_birth: yup.date().nullable(),
  booking_id: yup.string().nullable().required(),
});
