import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import AuthTemplate from "@/layouts/auth-template";
import { validateVerificationForm } from "./validation";
import {Formik} from "formik";
import { VerificationForm } from './components';
import { Verify } from './queries';
import { useMutation } from "react-query";
import { Message } from '@/components/alert/message';
import { saveLocalStorageCred } from "@/utils/local-storage";
import Router from 'next/router';
import _get from 'lodash.get';
import { useRouter } from "next/router";

const Verification = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { mutate: verify, isLoading: isLoadingVerify } = useMutation(Verify);
  return (
    <AuthTemplate>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h3>Verification</h3>
              <br/>
              <small>Please enter <strong>verification code</strong> you received in letter at your door step.</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                verification_code: "",
                user_id: userId,
              }}
              validationSchema={validateVerificationForm}
              onSubmit={async (values, actions) => {
                await verify(values, {
                  onSuccess: async res => {
                    await saveLocalStorageCred(res);
                    Message.success(res);
                    Router.push(
                      "/admin/dashboard",
                      "/admin/dashboard",
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
                  <VerificationForm {...formikProps} isLoadingLogin={isLoadingVerify} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};

export default Verification;