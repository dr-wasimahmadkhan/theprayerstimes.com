import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import AuthTemplate from "@/layouts/auth-template";
import { validateLoginForm } from "./validation";
import {Formik} from "formik";
import { LoginForm } from './components';
import { LOGIN } from './queries';
import { useMutation } from "react-query";
import { Message } from '@/components/alert/message';
import { saveLocalStorageCred } from "@/utils/local-storage";
import Router from 'next/router';
import _get from 'lodash.get';
import Link from "next/link";

const Login = () => {
  const { mutate: login, isLoading: isLoadingLogin } = useMutation(LOGIN);
  return (
    <AuthTemplate>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in </small>
              <br />
              <br />
              <small>Don't have an account? Create a new one <Link href="/admin/sign-up">Sign Up</Link> </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validateLoginForm}
              onSubmit={async (values, actions) => {
                await login(values, {
                  onSuccess: async res => {
                    if (!_get(res, 'data.is_verified', false)) {
                      return Router.push(
                        `/admin/login/${_get(res, 'data._id', '')}/verification`,
                        `/admin/login/${_get(res, 'data._id', '')}/verification`,
                        { shallow: true },
                      );
                    };
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
                  <LoginForm {...formikProps} isLoadingLogin={isLoadingLogin} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};

export default Login;