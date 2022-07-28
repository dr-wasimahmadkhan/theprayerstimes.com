import {googleGeoCodeApi} from "@/constants/env";

export const tableHeadings = [
  'Name',
  'City',
  'State',
  'Verification Code',
  'Is Verified',
  'Actions',
];

export const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${googleGeoCodeApi}&v=3.exp&libraries=geometry,drawing,places`;