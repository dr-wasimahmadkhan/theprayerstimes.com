import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { ContactView } from '../components';
import { useQuery } from "react-query";
import { GET_CONTACT_BY_ID } from "@/adminSite/contact/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import { ProcessingModal } from "@/components/modal";
import _get from 'lodash.get';

type Props = {
  isComplain: boolean,
}
const ViewBlog = (props: Props) => {
  const { isComplain } = props;
  const router = useRouter();
  const { contactId } = router.query;
  const isEnabled = contactId !== undefined;
  const {
    data: contactData,
    isLoading,
  } = useQuery(['CONTACT_BY_ID', { contactId }], GET_CONTACT_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title={isComplain ? "View Complain" : 'View Contact'}>
      <FormHeader heading={isComplain ? "View Complain" : "View Contact"} />
      <ContactView isComplain={isComplain} contactData={_get(contactData, 'data', {})}/>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewBlog;