import React from 'react';
import Home from '@/marketingSite/home';
import { baseURL } from "@/constants/env";
import {http_req} from "@/utils/http";

const Main = (props: any) => {
  return (
    <Home {...props} />
  );
};

// export async function getServerSideProps() {
//   const res = await http_req(
//     baseURL + `/v1/mosque/all-mosques?page_no=1&records_per_page=10&is_populate=${true}&is_verified=${true}`,
//     'get',
//   );
//   const allMosques = res?.data;
//   return {
//     props: {
//       allRes: {
//         mosquesRes: allMosques,
//       },
//     },
//   };
// };

export default Main;
