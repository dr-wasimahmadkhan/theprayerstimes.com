import React from 'react';
import { googleMapUrl } from '@/constants/mosque';
import GoogleMapMain from '@/components/google-map';
import _get from 'lodash.get';
import moment from 'moment';

const MosqueModalView = props => {
  const { mosque, prayers } = props;
  return (
    <>
      <h2>Basic Detail</h2>
      <br />
      <div className="row">
        <div className="col-sm-12 col-md-4 mb-3  custom-grid text-left">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Prayer</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {prayers.map((pray, i) => (
                  <tr key={i}>
                    <th scope="row">{_get(pray, 'name')}</th>
                    <td>
                      {_get(mosque, `timings.${pray.value}`, '')
                        ? moment(
                            _get(mosque, `timings.${pray.value}`, ''),
                          ).format('hh:mm a')
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 mb-3  custom-grid text-left">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{_get(mosque, 'name', '')}</td>
                </tr>
                <tr>
                  <th scope="row">Type</th>
                  <td>{_get(mosque, 'type', '')}</td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{_get(mosque, 'city', '')}</td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{_get(mosque, 'state', '')}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{_get(mosque, 'address', '')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 mb-3  custom-grid text-left">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Additional Information</th>
                </tr>
              </thead>
              <tbody>
                {_get(mosque, 'timings.is_eid_ul_fitr', '') && (
                  <tr>
                    <th scope="row">Eid-ul-Fitr</th>
                    <td>
                      {moment(
                        _get(mosque, 'timings.eid_ul_fitr_timing', ''),
                      ).format('hh:mm a')}
                    </td>
                  </tr>
                )}
                {_get(mosque, 'timings.is_eid_ul_adha', '') && (
                  <tr>
                    <th scope="row">Eid-ul-Adha</th>
                    <td>
                      {moment(
                        _get(mosque, 'timings.eid_ul_adha_timing', ''),
                      ).format('hh:mm a')}
                    </td>
                  </tr>
                )}
                {_get(mosque, 'timings.is_tarawih', '') && (
                  <tr>
                    <th scope="row">Eid-ul-Adha</th>
                    <td>
                      {moment(
                        _get(mosque, 'timings.tarawih_timing', ''),
                      ).format('hh:mm a')}
                    </td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Itikaf</th>
                  <td>
                    <input
                      type="checkbox"
                      checked={_get(mosque, 'timings.is_itikaf', '')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h2>Images</h2>
      <br />
      <div className="row">
        {_get(mosque, 'mosque_images', []).map((pic, i) => (
          <div className="col-sm-12 col-md-3 mb-3  custom-grid text-left">
            <img src={_get(pic, 'file_url', '')} />
          </div>
        ))}
      </div>
      <h2>Geo Location</h2>
      <br />
      <div className="row">
        <div className="col-sm-12 col-md-12 mb-3  custom-grid text-left">
          <GoogleMapMain
            values={{
              lat: _get(mosque, 'lat', 0),
              lon: _get(mosque, 'lon', 0),
            }}
            googleMapURL={googleMapUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `282px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </>
  );
};
export { MosqueModalView };
