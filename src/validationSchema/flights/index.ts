import * as yup from 'yup';

export const flightValidationSchema = yup.object().shape({
  flight_number: yup.string().required(),
  departure_airport: yup.string().required(),
  arrival_airport: yup.string().required(),
  departure_time: yup.date().required(),
  arrival_time: yup.date().required(),
  airline_id: yup.string().nullable().required(),
});
