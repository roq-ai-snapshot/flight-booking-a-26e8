import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { passengerValidationSchema } from 'validationSchema/passengers';
import { BookingInterface } from 'interfaces/booking';
import { PassengerInterface } from 'interfaces/passenger';

function PassengerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: PassengerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.passenger.create({ data: values as RoqTypes.passenger });
      resetForm();
      router.push('/passengers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PassengerInterface>({
    initialValues: {
      first_name: '',
      last_name: '',
      passport_number: '',
      nationality: '',
      date_of_birth: new Date(new Date().toDateString()),
      booking_id: (router.query.booking_id as string) ?? null,
    },
    validationSchema: passengerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Passengers',
              link: '/passengers',
            },
            {
              label: 'Create Passenger',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Passenger
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.first_name}
            label={'First Name'}
            props={{
              name: 'first_name',
              placeholder: 'First Name',
              value: formik.values?.first_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.last_name}
            label={'Last Name'}
            props={{
              name: 'last_name',
              placeholder: 'Last Name',
              value: formik.values?.last_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.passport_number}
            label={'Passport Number'}
            props={{
              name: 'passport_number',
              placeholder: 'Passport Number',
              value: formik.values?.passport_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.nationality}
            label={'Nationality'}
            props={{
              name: 'nationality',
              placeholder: 'Nationality',
              value: formik.values?.nationality,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_of_birth" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Of Birth
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_of_birth ? new Date(formik.values?.date_of_birth) : null}
              onChange={(value: Date) => formik.setFieldValue('date_of_birth', value)}
            />
          </FormControl>
          <AsyncSelect<BookingInterface>
            formik={formik}
            name={'booking_id'}
            label={'Select Booking'}
            placeholder={'Select Booking'}
            fetcher={() => roqClient.booking.findManyWithCount({})}
            labelField={'booking_code'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/passengers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'passenger',
    operation: AccessOperationEnum.CREATE,
  }),
)(PassengerCreatePage);
