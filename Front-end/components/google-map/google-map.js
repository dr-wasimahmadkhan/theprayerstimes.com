import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

type Props = {
    values: {
        lat: string,
        lon: string
    }
}
const GoogleMapMain = withScriptjs(withGoogleMap((props: Props) => {
  const {values} = props;
  const {lat, lon} = values;
  return (
    <GoogleMap defaultZoom={15} center={{lat: Number(lat), lng: Number(lon)}}>
      <Marker position={{lat: Number(lat), lng: Number(lon)}}/>
    </GoogleMap>
  );
}));

export default GoogleMapMain;
