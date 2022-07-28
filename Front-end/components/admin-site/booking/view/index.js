import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { BookingForm } from '../components';
import { Formik } from 'formik';
import { useQuery } from "react-query";
import { GET_BOOKING_BY_ID } from "@/adminSite/booking/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import moment from "moment";
import { City, State } from "country-state-city";
import { ProcessingModal } from "@/components/modal";
import {billRangeOptions, creditScoreOptions} from "@/constants/booking";

const ViewBooking = () => {
  const router = useRouter();
  const { bookingId } = router.query;
  const isEnabled = bookingId !== undefined;
  const {
    data: bookingData,
    isLoading,
  } = useQuery(['BOOKING_BY_ID', { bookingId }], GET_BOOKING_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  const state = State.getStateByCodeAndCountry(
    _get(bookingData, 'data.state', ''), 'US',
  );
  const cities = City.getCitiesOfState(
    'US', _get(bookingData, 'data.state', ''),
  );
  const findCity = cities?.find(
    city => city.name === _get(bookingData, 'data.city', ''),
  );
  const findBillRange = billRangeOptions.find(
    range => range.value === _get(bookingData, 'data.bill_range', ''));
  const findCreditScore = creditScoreOptions.find(
    range => range.value === _get(bookingData, 'data.credit_score', ''));
  return (
    <SecureTemplate title="View Booking">
      <FormHeader heading="View Booking" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          full_name: _get(bookingData, 'data.full_name', ''),
          email: _get(bookingData, 'data.email', ''),
          phone_number: _get(bookingData, 'data.phone_number', ''),
          state: _get(bookingData, 'data.state', ''),
          stateObj: state,
          city: _get(bookingData, 'data.city', ''),
          cityObj: findCity,
          address: _get(bookingData, 'data.address', ''),
          product_id: _get(bookingData, 'data.product_id', {}),
          bill_range: findBillRange,
          credit_score: findCreditScore,
          created_by: _get(bookingData, 'data.created_by', ''),
        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <BookingForm {...formikProps} isView={true} />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewBooking;