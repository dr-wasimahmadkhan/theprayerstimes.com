import React from "react";
import AuthTemplate from "@/layouts/auth-template";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import {Formik} from "formik";
import {validateMosqueForm} from "@/adminSite/sign-up/validation";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import {useMutation} from "react-query";
import {ADD_MOSQUE} from "@/adminSite/sign-up/queries";
import {MosqueDetailForm} from "./components";
import {getLocalStorageValues} from "@/constants/local-storage";
import _get from 'lodash.get';
import {ProcessingModal} from "@/components/modal";

const MosqueDetail = () => {
  const { user_id } = getLocalStorageValues();
  const { mutate: addMosque, isLoading: isLoadingSave } = useMutation(ADD_MOSQUE);
  return (
    <AuthTemplate message="Please Enter Mosque Details">
      <Col lg="8" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Mosque Detail </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: "",
                address: "",
                city: {},
                state: {},
                type: "Sunni",
                lat: 31.582045,
                lon: 74.329376,
                user_id: user_id,
                created_by: user_id,
              }}
              validationSchema={validateMosqueForm}
              onSubmit={async (values, actions) => {
                values.state = values.state.isoCode;
                values.city = values.city.name;
                await addMosque(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    Router.push(
                      `/admin/sign-up/mosque/${_get(res, 'data._id')}/timing`,
                      `/admin/sign-up/mosque/${_get(res, 'data._id')}/timing`,
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
                  <MosqueDetailForm {...formikProps} isLoadingSave={isLoadingSave} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
        {isLoadingSave && <ProcessingModal />}
    </AuthTemplate>
  );
};

export default MosqueDetail;