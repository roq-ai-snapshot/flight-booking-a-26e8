import * as yup from 'yup';

export const travelAgentValidationSchema = yup.object().shape({
  agency_name: yup.string().required(),
  contact_number: yup.string().nullable(),
  address: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
