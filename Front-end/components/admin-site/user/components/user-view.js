import React from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import _get from 'lodash.get';
import moment from 'moment';

type Props = {
  userData: any,
  isManagement: boolean
};
const UserView = (props: Props) => {
  const { userData, isManagement } = props;
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                  User Detail
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">
                    Name:
                  </Col>
                  <Col lg="10">
                    {_get(userData, 'full_name', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Email:
                  </Col>
                  <Col lg="10">
                    {_get(userData, 'email', '')}
                  </Col>
                </Row>
                <br />
                {!isManagement && (
                  <Row>
                    <Col lg="2">
                    Is Verified:
                    </Col>
                    <Col lg="10">
                      {_get(userData, 'is_verified', false) ? "Verified" : 'Not Verified'}
                    </Col>
                  </Row>)}
                {isManagement && (
                  <Row>
                    <Col lg="2">
                        Role:
                    </Col>
                    <Col lg="10">
                        Customer Care
                    </Col>
                  </Row>)}
                <br />
                <Row>
                  <Col lg="2">
                    Created At:
                  </Col>
                  <Col lg="10">
                    {moment(_get(userData, 'createdAt', '')).format('YYYY-MM-DD')}
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { UserView };