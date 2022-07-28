import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { useQuery } from "react-query";
import { GET_USER_BY_ID } from "@/adminSite/user/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import { ProcessingModal } from "@/components/modal";
import { UserView } from '../components';
import _get from 'lodash.get';

type Props = {
    isManagement: boolean,
}
const ViewUser = (props: Props) => {
    const { isManagement} = props;
  const router = useRouter();
  const { userId } = router.query;
  const isEnabled = userId !== undefined;
  const {
    data: userData,
    isLoading,
  } = useQuery(['GET_User_BY_ID', { userId }],
    GET_USER_BY_ID, {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: err => {
        Message.error(err);
        router.back();
      },
    });
  return (
    <SecureTemplate title="View User">
      <FormHeader heading={`View User`} />
      <UserView isManagement={isManagement} userData={_get(userData, 'data', {})} />
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewUser;