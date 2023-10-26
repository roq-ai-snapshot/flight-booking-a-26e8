import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  booking_code: yup.string().required(),
  seat_number: yup.string().nullable(),
  booking_date: yup.date().required(),
  flight_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
