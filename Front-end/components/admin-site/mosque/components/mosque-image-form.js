import React, { useState } from 'react';
import {Button, Card, CardBody, Col, Container, Badge, Form, FormFeedback, FormGroup, Row, Spinner} from "reactstrap";
import DatePicker from "react-datepicker";
import {Field} from "formik";
import {fieldValidateBool} from "@/utils/form";
import UppyFileUploader from "@/components/uppy-file-uploader";
import {useMutation} from "react-query";
import {UPDATE_STORAGE_FILE} from "@/adminSite/mosque/queries";
import _get from 'lodash.get';
import {imageTypes} from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
import LazyLoadImages from "@/components/images";

type Props = {
    values: any,
    errors: any,
    dirty: boolean,
    isSubmitting: boolean,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isLoadingSave: boolean,
    setFieldValue: any,
};
const MosqueImageForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isLoadingSave } = props;
    const {
      mutate: updateFile,
      isLoading: isLoadingUpdateFile,
    } = useMutation(UPDATE_STORAGE_FILE);
    const [isMultiFilesUploading, setIsLoadingMultiFiles] = useState(false);
    const [imageUploadModal, setImageModalOpen] = useState(false);
    const toggleImageModal = () => setImageModalOpen(!imageUploadModal);
    const handleUploadDone = res => {
      const newData = [...values.mosque_images, ..._get(res, 'data', [])];
      setFieldValue('mosque_images', newData, true);
    };
    const handleRemoveImage = async id => {
      await updateFile(id, {
        onSuccess: () => {
          const filterData = values.mosque_images.filter(pic => pic._id !== id);
          setFieldValue('mosque_images', filterData, true);
        },
        onError: () => {
          const otherOptions = {
            message: "Error in removing file",
          };
          Message.error(null, otherOptions);
        },
      });
    };
    const handleUploadImages = () => {
        setImageModalOpen(true);
    };

    console.log("values", values);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <div className="pl-lg-4">
                <Form role="form">
                <div className="pl-lg-4">
                    <h6 className="heading-small text-muted mb-4">
                      Mosque Images
                    </h6>
                      <Row>
                        <Col>
                          <Button
                            block
                            color="primary"
                            className="btn-icon btn-3 my-4"
                            size="lg"
                            onClick={handleUploadImages}
                          >
                            <span className="btn-inner--text">
                          Upload Images
                            </span>
                            <span className="btn-inner--icon">
                              <i className="ni ni-camera-compact"/>
                            </span>
                          </Button>
                          {_get(errors, 'images_data', '') && (
                            <FormFeedback>
                              {errors.images_data}
                            </FormFeedback>
                          )}
                        </Col>
                      </Row>
                    <Row>
                    {_get(values, 'mosque_images', []).map((pic, i) => (
                        <Col lg="4" key={i}>
                            <Badge
                              bg="danger"
                              className="badge-circle bg-danger
                            text-white image-badge badge-floating border-white"
                              onClick={() => handleRemoveImage(pic._id)}
                            >
                              <i className="ni ni-fat-remove"/>
                            </Badge>
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
                  </div>
                  <div className="text-left">
                    <Button
                      className="btn-icon btn-3 my-4"
                      color="primary"
                      type="button"
                      disabled={!dirty || isSubmitting || isLoadingSave}
                      onClick={handleSubmit}
                    >
                      <span className="btn-inner--text">Update</span>
                      <span className="btn-inner--icon">
                        {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
                      </span>
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UppyFileUploader
        maxFileSize={30}
        maxNumberOfFiles={20}
        acceptFileTypes={imageTypes}
        open={imageUploadModal}
        isMulti={true}
        axiosMethod="post"
        handleClose={toggleImageModal}
        uploadUrl={"storage-file/multiple-files"}
        setOpenImageModal={setImageModalOpen}
        handleUploadDone={handleUploadDone}
        setIsLoadingMultiFiles={setIsLoadingMultiFiles}
      />
      {(isLoadingUpdateFile || isMultiFilesUploading) && <ProcessingModal />}
    </Container>
  );
};
export { MosqueImageForm};