import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Input } from 'reactstrap';
import _get from 'lodash.get';
import moment from 'moment';
import GoogleMapMain from '@/components/google-map';
import { googleGeoCodeApi } from '@/constants/env';
import Letter from '@/adminSite/mosque/letter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import LazyLoadImages from '@/components/images';

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${googleGeoCodeApi}&v=3.exp&libraries=geometry,drawing,places`;

type Props = {
  mosqueData: any,
  timingData: any,
};
const MosqueView = (props: Props) => {
  const { mosqueData, timingData } = props;
  const [showPdf, setShowPdf] = useState(false);
  const printDocument = () => {
    setShowPdf(true);
    // eslint-disable-next-line no-undef
    const input = document.getElementById('divToPrint');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save(`${mosqueData.name}.pdf`);
    });
  };
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">Mosque Detail</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">Name:</Col>
                  <Col lg="10">{_get(mosqueData, 'name', '')}</Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">State:</Col>
                  <Col lg="10">{_get(mosqueData, 'state', '')}</Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">City:</Col>
                  <Col lg="10">{_get(mosqueData, 'city', '')}</Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Address:</Col>
                  <Col lg="10">{_get(mosqueData, 'address', '')}</Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Is Verified:</Col>
                  <Col lg="10">
                    {_get(mosqueData, 'user_id.is_verified', false)
                      ? 'Verified'
                      : 'Not Verified'}
                  </Col>
                </Row>
                <br />
                {!_get(mosqueData, 'user_id.is_verified', false) && (
                  <Row>
                    <Col lg="12">
                      <button
                        className="btn btn-primary"
                        onClick={printDocument}>
                        Generate Letter
                      </button>
                    </Col>
                  </Row>
                )}
                <br />
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">Timings</h6>
                <Row>
                  <Col lg="2">Fajr:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'fajr', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Dhuhr:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'dhuhr', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Asr:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'asr', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Maghrib:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'maghrib', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Isha:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'isha', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">Jummah:</Col>
                  <Col lg="10">
                    {moment(_get(timingData, 'jummah', new Date())).format(
                      'hh:mm a',
                    )}
                  </Col>
                </Row>
                <br />
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Additional Information
                </h6>
                {_get(timingData, 'is_eid_ul_fitr', false) && (
                  <>
                    <Row>
                      <Col lg="2">Eid-Ul-Fitr</Col>
                      <Col lg="10">
                        {moment(
                          _get(timingData, 'eid_ul_fitr_timing', new Date()),
                        ).format('hh:mm a')}
                      </Col>
                    </Row>
                    <br />
                  </>
                )}
                {_get(timingData, 'is_eid_ul_adha', false) && (
                  <>
                    <Row>
                      <Col lg="2">Eid-Ul-Adha</Col>
                      <Col lg="10">
                        {moment(
                          _get(timingData, 'eid_ul_adha_timing', new Date()),
                        ).format('hh:mm a')}
                      </Col>
                    </Row>
                    <br />
                  </>
                )}
                {_get(timingData, 'is_tarawih', false) && (
                  <>
                    <Row>
                      <Col lg="2">Tarawih</Col>
                      <Col lg="10">
                        {moment(
                          _get(timingData, 'tarawih_timing', new Date()),
                        ).format('hh:mm a')}
                      </Col>
                    </Row>
                    <br />
                  </>
                )}
                {_get(timingData, 'is_itikaf', false) && (
                  <>
                    <Row>
                      <Col lg="2">
                        {' '}
                        <span style={{ marginRight: '100px' }}>Itikaf</span>
                      </Col>
                      <Col lg="10">
                        <Input
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                          onChange={() => {}}
                          name="is_itikaf"
                          checked={_get(timingData, 'is_itikaf', false)}
                          className="form-control-alternative"
                          style={{ marginLeft: 'auto' }}
                        />
                      </Col>
                    </Row>
                    <br />
                  </>
                )}
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">Images</h6>
                <Row>
                  {_get(mosqueData, 'mosque_images', []).map((pic, i) => (
                    <Col md={4} key={i}>
                      <LazyLoadImages
                        isHeight={true}
                        isWidth={true}
                        height={200}
                        width={200}
                        url={_get(pic, 'file_url', '')}
                        className="img-fluid rounded shadow"
                      />
                    </Col>
                  ))}
                </Row>
                <br />
                <hr className="my-4" />
                <Row>
                  <Col lg="12">
                    <GoogleMapMain
                      values={{
                        lat: _get(mosqueData, 'lat', 0),
                        lon: _get(mosqueData, 'lon', 0),
                      }}
                      googleMapURL={googleMapUrl}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `282px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {showPdf && <Letter mosqueDataToPrint={mosqueData} />}
    </Container>
  );
};
export { MosqueView };
