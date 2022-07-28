import React from "react";
import AuthTemplate from "@/layouts/auth-template";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import {Formik} from "formik";
import {validateTimingForm} from "@/adminSite/sign-up/validation";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import {useMutation} from "react-query";
import {ADD_TIMINGS} from "@/adminSite/sign-up/queries";
import {TimingForm} from "./components";
import {getLocalStorageValues} from "@/constants/local-storage";
import { useRouter } from "next/router";
import {ProcessingModal} from "@/components/modal";

const Timing = () => {
  const router = useRouter();
  const { mosqueId } = router.query;
  const { user_id } = getLocalStorageValues();
  const { mutate: addTimings, isLoading: isLoadingSave } = useMutation(ADD_TIMINGS);
  return (
    <AuthTemplate message="Please Enter Mosque Timings">
      <Col lg="6" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Mosque Timings </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                fajr: new Date(),
                dhuhr: new Date(),
                jummah: new Date(),
                asr: new Date(),
                maghrib: new Date(),
                isha: new Date(),
                mosque_id: mosqueId,
                user_id: user_id,
                created_by: user_id,
              }}
              validationSchema={validateTimingForm}
              onSubmit={async (values, actions) => {
                await addTimings(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    Router.push(
                      "/admin/sign-up/confirmation",
                      "/admin/sign-up/confirmation",
                      { shallow: true },
                    );
                  },
                  onError: err => {
                    Message.error(err);
                    actions.resetForm();
                  },
                });
              }}
            >
              {formikProps => {
                return (
                  <TimingForm {...formikProps} isLoadingSave={isLoadingSave} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
      {isLoadingSave && <ProcessingModal />}
    </AuthTemplate>
  );
};

export default Timing;