import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { ProductForm } from '../components';
import { Formik } from 'formik';
import {useMutation, useQuery} from "react-query";
import {UPDATE_PRODUCT, GET_PRODUCT_BY_ID}
  from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";
import { validateUpdateProductForm} from
  "@/adminSite/products/validation";

const EditProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const {
    mutate: updateProduct,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_PRODUCT);
  const { user_id } = getLocalStorageValues();
  const isEnabled = productId !== undefined;
  const {
    data: productData,
    isLoading,
  } = useQuery(['PRODUCT_BY_ID',
    { productId }], GET_PRODUCT_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="Edit Product">
      <FormHeader heading="Edit Product" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(productData, 'data.title', ''),
          description: _get(productData, 'data.description', ''),
          image_id: _get(productData,
            'data.image_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateProductForm}
        onSubmit={async (values, actions) => {
          values.image_id = values.image_id._id;
          await updateProduct({
            id: productId,
            data: values,
          }, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/products",
                "/admin/products",
                { shallow: true },
              );
            },
            onError: err => {
              Message.error(err);
              actions.resetForm();
            },
          });
        }}
      >
        {formikProps => {
          return (
            <ProductForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditProduct;