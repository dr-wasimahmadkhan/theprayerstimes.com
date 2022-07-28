import React, {useState} from 'react';
import { Header, Footer, SideBar } from './components';
import { Container } from "reactstrap";
import routes from "@/constants/secure-template";
import { SecureHead } from "@/layouts/secure-template/secure-head";
import MyComponent from 'react-fullpage-custom-loader';
import Router from 'next/router';
import { GET_USER_BY_ID } from './queries';
import { useQuery } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import {getLocalStorageValues} from "@/constants/local-storage";
import TemplateContext from './context';
import _get from 'lodash.get';
import { removeLocalStorageCred } from '@/utils/local-storage';
import { useRouter } from "next/router";

type Props = {
  children: any,
  title: string,
}
const SecureTemplate = (props: Props) => {
  const { children, title } = props;
  const router = useRouter();
  const { pathname } = router;
  const { user_id } = getLocalStorageValues();
  const TemplateProvider = TemplateContext.Provider;
  const isEnabled = typeof user_id === "string";
  const {
    data: userData,
    refetch: refetchUserData,
    isLoading: isLoadingUserData,
  } = useQuery(['GET_USER_BY_ID',  { userId: user_id }], GET_USER_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onSuccess: res => {
      const pathsAllowed = [
        '/admin/login',
        '/admin/profile',
        '/admin/profile/edit',
        '/admin/dashboard',
        '/admin/mosque',
        '/admin/mosque/[mosqueId]/edit',
        '/admin/mosque/[mosqueId]/images',
        '/admin/mosque/[mosqueId]/additional-info',
        '/admin/training-videos',
        `/admin/training-videos/[videoId]/view`,
      ];
      if (!_get(res, 'data.is_admin') && _get(res, 'data.role') === 'user') {
        if (!pathsAllowed.includes(pathname)) {
          Router.push('/admin/dashboard', '/admin/dashboard', { shallow: true });
        }
      }
    },
    onError: async () => {
      await removeLocalStorageCred();
      Router.push('/admin/login', '/admin/login', { shallow: true });
    },
  });
  const [isRouting, setIsRouting] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsRouting(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setIsRouting(false);
  });
  Router.events.on("routeChangeError", () => {
    setIsRouting(false);
  });
  return (
    <TemplateProvider
      value={{
        userData: _get(userData, 'data', {}),
        refetchUserData: refetchUserData,
        isLoadingUserData: isLoadingUserData,
      }}
    >
      <SecureHead title={title} />
      <SideBar
        {...props}
        routes={routes(_get(userData, 'data.is_admin', false), _get(userData, 'data.role', 'user'))}
        isRouting={isRouting}
        logo={{
          innerLink: "/admin/dashboard",
          outterLink: "/admin/dashboard",
          imgSrc: "/marketing/images/mylogo.png",
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        {isRouting && (
          <MyComponent width={"100%"} height={"100%"}/>
        )}
        <Header
          {...props}
          userData={_get(userData, 'data', {})}
          isLoadingUserData={isLoadingUserData}
        />
        {children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </TemplateProvider>
  );
};
export default SecureTemplate;