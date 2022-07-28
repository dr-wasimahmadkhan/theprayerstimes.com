import React, {useContext} from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { GET_DASHBOARD_STATS }  from './queries';
import { useQuery } from "react-query";
import {getLocalStorageValues} from "@/constants/local-storage";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import {numberFormat} from "@/utils/display";
import TemplateContext from "@/layouts/secure-template/context";

const Stats = () => {
  const { user_id } = getLocalStorageValues();
  const isEnabled = typeof user_id === 'string';
  const { data: dashboardData } = useQuery(
    ['DASHBOARD_STATS', { user_id: user_id }],
    GET_DASHBOARD_STATS,
    {
      ...reactQueryConfig,
      enabled: isEnabled,
    });
  const {
    userData,
  } = useContext(TemplateContext);
  return (
    <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          {/* Card stats */}
          <Row>
            {_get(userData, 'is_admin', false) && (
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                        Total Mosques
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberFormat(
                            _get(dashboardData, 'data.totalMosques', 0),
                          )}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon
                         icon-shape bg-danger
                          text-white rounded-circle shadow"
                        >
                          <i className="fas fa-chart-bar"/>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">This month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            )}
            {_get(userData, 'is_admin', false) && (
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                        Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberFormat(
                            _get(dashboardData, 'data.totalUsers', 0),
                          )}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon
                         icon-shape bg-warning
                          text-white rounded-circle shadow"
                        >
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">All Time</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            )}
            {!_get(userData, 'is_admin', false) && (
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                        Total Contacts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberFormat(
                            _get(dashboardData, 'data.totalContact', [])
                          )}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon
                         icon-shape bg-yellow
                          text-white rounded-circle shadow"
                        >
                          <i className="ni ni-image" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">All Time</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            )}
            <Col lg="6" xl="4">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Total Complains
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {numberFormat(
                          _get(dashboardData, 'data.totalComplains', 0),
                        )}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div
                        className="icon
                         icon-shape bg-yellow
                          text-white rounded-circle shadow"
                      >
                        <i className="ni ni-image" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap">All Time</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export { Stats };