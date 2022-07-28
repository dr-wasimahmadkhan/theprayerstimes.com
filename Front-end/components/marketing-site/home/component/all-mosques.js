import React, { useState } from 'react';
import { googleMapUrl } from '@/constants/mosque';
import GoogleMapMain from '@/components/google-map';
import _get from 'lodash.get';
import { MosqueViewModal } from '@/components/modal';
import { MosqueModalView } from './index';
import moment from 'moment';
const AllMosques = props => {
  const { mosque } = props;
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);
  console.log('detailModal', detailModal);
  const prayers = [
    {
      name: 'Fajr',
      value: 'fajr',
    },
    {
      name: 'Dhuhr',
      value: 'dhuhr',
    },
    {
      name: 'Asr',
      value: 'asr',
    },
    {
      name: 'Maghrib',
      value: 'maghrib',
    },
    {
      name: 'Isha',
      value: 'isha',
    },
    {
      name: 'Jummah',
      value: 'jummah',
    },
  ];
  const handleOpenDirection = mosque => {
    window.open(
      `http://maps.google.com/?q=${_get(mosque, 'address')} ${_get(
        mosque,
        'state',
      )}
    ${_get(mosque, 'city')}`,
      '_blank',
    );
  };
  return (
    <div className="col-sm-4 mb-3  custom-grid text-left">
      <div className="card border card-border p-3">
        <span className="card-img-top">
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
        </span>
        <div className="card-body">
          <h5 className="card-title">Name: {_get(mosque, 'name', '')}</h5>
          <p className="card-text">
            Address: {_get(mosque, 'address')}, {_get(mosque, 'state')},{' '}
            {_get(mosque, 'city')}
          </p>
        </div>
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
        <p>Click on View Details to see more Information</p>
        <div className="card-footer">
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary" onClick={toggleDetailModal}>
                View Details
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                onClick={() => handleOpenDirection(mosque)}>
                Get Direction
              </button>
            </div>
          </div>
        </div>
      </div>
      <MosqueViewModal show={detailModal} toggleModal={toggleDetailModal}>
        <MosqueModalView mosque={mosque} prayers={prayers} />
      </MosqueViewModal>
    </div>
  );
};

export default AllMosques;
