import React from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import _get from 'lodash.get';

type Props = {
  contactData: any,
  isComplain: boolean,
};
const ContactView = (props: Props) => {
  const { contactData, isComplain } = props;
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                {isComplain ? 'Complain' :'Contact'} Detail
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">
                    User Name:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'full_name', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Email:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'email', '')}
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg="2">
                    Subject:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'subject', '')}
                  </Col>
                </Row>
                <br />

                {isComplain && (
                  <>
                    <br />
                    <Row>
                      <Col lg="2">
                        Complain For Mosque:
                      </Col>
                      <Col lg="10">
                        {_get(contactData, 'mosque_id.name', '')}
                      </Col>
                    </Row>
                  </>
                )}
                <br />
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">
                  Message
                </h6>
                <Row>
                  <Col>
                    {_get(contactData, 'message', '')}
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
export { ContactView};