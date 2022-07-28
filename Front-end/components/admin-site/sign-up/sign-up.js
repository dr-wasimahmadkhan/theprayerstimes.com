import React from "react";
import AuthTemplate from "@/layouts/auth-template";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import {Formik} from "formik";
import {validateSignUpForm} from "@/adminSite/sign-up/validation";
import {saveLocalStorageCred} from "@/utils/local-storage";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import {SignUpForm} from "@/adminSite/sign-up/components";
import {useMutation} from "react-query";
import {SIGNUP} from "@/adminSite/sign-up/queries";
import _omit from 'lodash.omit';
import {ProcessingModal} from "@/components/modal";
import Link from 'next/link';

const SignUp = () => {
  const { mutate: signUp, isLoading: isLoadingSignUp } = useMutation(SIGNUP);
  return (
    <AuthTemplate>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign Up </small>
              <br />
              <br />
              <small>Already have an account? <Link href="/admin/login">Log In</Link> </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              initialValues={{
                full_name: "",
                email: "",
                password: "",
                confirm_password: "",
              }}
              validationSchema={validateSignUpForm}
              onSubmit={async (values, actions) => {
                await signUp(_omit(values, 'confirm_password'), {
                  onSuccess: async res => {
                    await saveLocalStorageCred(res);
                    Message.success(res);
                    Router.push(
                      "/admin/sign-up/mosque/detail",
                      "/admin/sign-up/mosque/detail",
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
                  <SignUpForm {...formikProps} isLoadingSignUp={isLoadingSignUp} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
      {isLoadingSignUp && <ProcessingModal />}
    </AuthTemplate>
  );
};
export default SignUp;