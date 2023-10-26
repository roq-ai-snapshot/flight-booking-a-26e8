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

import { flightValidationSchema } from 'validationSchema/flights';
import { AirlineInterface } from 'interfaces/airline';
import { FlightInterface } from 'interfaces/flight';

function FlightCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: FlightInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.flight.create({ data: values as RoqTypes.flight });
      resetForm();
      router.push('/flights');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FlightInterface>({
    initialValues: {
      flight_number: '',
      departure_airport: '',
      arrival_airport: '',
      departure_time: new Date(new Date().toDateString()),
      arrival_time: new Date(new Date().toDateString()),
      airline_id: (router.query.airline_id as string) ?? null,
    },
    validationSchema: flightValidationSchema,
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
              label: 'Flights',
              link: '/flights',
            },
            {
              label: 'Create Flight',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Flight
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.flight_number}
            label={'Flight Number'}
            props={{
              name: 'flight_number',
              placeholder: 'Flight Number',
              value: formik.values?.flight_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.departure_airport}
            label={'Departure Airport'}
            props={{
              name: 'departure_airport',
              placeholder: 'Departure Airport',
              value: formik.values?.departure_airport,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.arrival_airport}
            label={'Arrival Airport'}
            props={{
              name: 'arrival_airport',
              placeholder: 'Arrival Airport',
              value: formik.values?.arrival_airport,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="departure_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Departure Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.departure_time ? new Date(formik.values?.departure_time) : null}
              onChange={(value: Date) => formik.setFieldValue('departure_time', value)}
            />
          </FormControl>
          <FormControl id="arrival_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Arrival Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.arrival_time ? new Date(formik.values?.arrival_time) : null}
              onChange={(value: Date) => formik.setFieldValue('arrival_time', value)}
            />
          </FormControl>
          <AsyncSelect<AirlineInterface>
            formik={formik}
            name={'airline_id'}
            label={'Select Airline'}
            placeholder={'Select Airline'}
            fetcher={() => roqClient.airline.findManyWithCount({})}
            labelField={'name'}
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
              onClick={() => router.push('/flights')}
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
    entity: 'flight',
    operation: AccessOperationEnum.CREATE,
  }),
)(FlightCreatePage);
