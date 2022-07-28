import React from "react";
import AuthTemplate from "@/layouts/auth-template";
import {Card, CardBody, CardHeader, Col} from "reactstrap";

const Confirmation = () => {
  return (
    <AuthTemplate>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign Up </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
              You have successfully Created account.
              You will receive letter within 2 business days at your address with verification code.
              Please Go to login and enter that verification code to login.
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};
export default Confirmation;