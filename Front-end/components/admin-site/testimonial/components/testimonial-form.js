import React, {useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner,
  Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import ReactQuill from '@/components/react-quill';
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes} from "@/constants/file-types";
import _get from 'lodash.get';
import {ProcessingModal} from "@/components/modal";
import LazyLoadImages from "@/components/images";
import { UPDATE_STORAGE_FILE} from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";

type Props = {
  values: any,
  errors: any,
  dirty: boolean,
  isSubmitting: boolean,
  handleChange: Function,
  handleBlur: Function,
  handleSubmit: Function,
  isLoadingSave: boolean,
  isView: boolean,
  buttonText: string,
  setFieldValue: any,
};

const TestimonialForm = (props: Props) => {
  const
    {
      values,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      isLoadingSave,
      isView,
      buttonText,
      setFieldValue,
    } = props;
  const {
    mutate: updateFile,
    isLoading: isLoadingUpdateFile,
  } = useMutation(UPDATE_STORAGE_FILE);
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(!imageUploadModal);
  const handleUploadDone = data => {
    setFieldValue('testimonial_by_image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id, {
      onSuccess: () => {
        setFieldValue('testimonial_by_image_id', {}, true);
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
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Testimonial information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col>
                      <Field name="title">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Title
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Title for testimonial"
                                type="text"
                                name="title"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.title}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field name="content">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Content
                              </label>
                              <ReactQuill
                                className="form-control-alternative"
                                handleBlur={() => handleBlur(
                                  { target: { name: "content" }},
                                )}
                                value={values.content}
                                handleChange={value =>
                                  form.setFieldValue(field.name, value, true)
                                }
                                placeholder="Content for testimonial"
                                disabled={isView || isLoadingSave}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback
                                  style={{
                                    marginTop: '3.50rem',
                                  }}
                                >
                                  {errors.content}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4 mt-5"/>
                <h6 className="heading-small text-muted mb-4">
                  Testimonial By Information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col>
                      <Field name="testimonial_by_name">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                              Testimonial By Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Name of the person testimonial by"
                                type="text"
                                name="testimonial_by_name"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.testimonial_by_name}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.testimonial_by_name}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <h6 className="heading-small text-muted mb-4">
                    Testimonial By Image
                  </h6>
                  {!isView &&
                  !_get(values, 'testimonial_by_image_id.file_url', '') && (
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
                        {_get(errors, 'testimonial_by_image_id._id', '') && (
                          <FormFeedback>
                            {errors.testimonial_by_image_id._id}
                          </FormFeedback>
                        )}
                      </Col>
                    </Row>
                  )}
                  <Row>
                    {_get(values,
                      'testimonial_by_image_id.file_url',
                      '') && (
                      <Col lg="4">
                        {!isView && (
                          <Badge
                            bg="danger"
                            className="badge-circle bg-danger
                            text-white image-badge badge-floating border-white"
                            onClick={() => handleRemoveImage(_get(values,
                              'testimonial_by_image_id._id',
                              ''))
                            }
                          >
                            <i className="ni ni-fat-remove"/>
                          </Badge>
                        )}
                        <FormGroup>
                          <LazyLoadImages
                            isHeight={true}
                            isWidth={true}
                            height={200}
                            width={200}
                            url={_get(values,
                              'testimonial_by_image_id.file_url',
                              '')
                            }
                            className="img-fluid rounded shadow"
                          />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  <hr className="my-4 mt-3"/>
                </div>
                {!isView && (
                  <Button
                    className="btn-icon btn-3 my-4"
                    color="primary float-right"
                    type="button"
                    disabled={!dirty || isSubmitting || isLoadingSave}
                    onClick={handleSubmit}
                  >
                    <span className="btn-inner--text">
                      {buttonText || 'Create'}
                    </span>
                    <span className="btn-inner--icon">
                      {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
                    </span>
                  </Button>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UppyFileUploader
        maxFileSize={30}
        maxNumberOfFiles={1}
        acceptFileTypes={imageTypes}
        open={imageUploadModal}
        isMulti={false}
        axiosMethod="post"
        handleClose={toggleImageModal}
        uploadUrl={"storage-file"}
        setOpenImageModal={setImageModalOpen}
        performFunc={handleUploadDone}
      />
      {(isLoadingUpdateFile) && <ProcessingModal />}
    </Container>
  );
};

export {TestimonialForm};