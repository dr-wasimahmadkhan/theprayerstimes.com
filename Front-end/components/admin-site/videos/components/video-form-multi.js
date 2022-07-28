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
  FormFeedback, Spinner, Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import {useMutation, useQuery} from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import {UPDATE_STORAGE_FILE} from "@/adminSite/testimonial/queries";
import {Message} from "@/components/alert/message";
import UppyFileUploader from "@/components/uppy-file-uploader";
import { videoTypes } from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
import { GET_VIDEO_COUNT } from '../queries';
import ReactQuill from "@/components/react-quill";
import ReactPlayer from 'react-player/lazy';

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

const VideoFormMulti = (props: Props) => {
  const {
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
  const { data: videoCount } = useQuery(
    ['VIDEO_COUNT', {}], GET_VIDEO_COUNT, {
      ...reactQueryConfig,
    });
  const [isMultiFilesUploading, setIsLoadingMultiFiles] = useState(false);
  const [videoUploadModal, setVideoModalOpen] = useState(false);
  const toggleVideoModal = () => setVideoModalOpen(!videoUploadModal);
  const handleUploadDone = res => {
    const newData = [...values.videos_data, ..._get(res, 'data', [])];
    setFieldValue('videos_data', newData, true);
  };
  const handleRemoveVideo = async id => {
    await updateFile(id, {
      onSuccess: () => {
        const filterData = values.videos_data.filter(pic => pic._id !== id);
        setFieldValue('videos_data', filterData, true);
      },
      onError: () => {
        const otherOptions = {
          message: "Error in removing file",
        };
        Message.error(null, otherOptions);
      },
    });
  };
  const handleUploadVideos = () => {
    if (_get(videoCount, 'data', 0) < 50) {
      setVideoModalOpen(true);
    } else {
      const otherOptions = {
        message: "Only 50 videos allowed.",
      };
      Message.error(null, otherOptions);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Video information
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
                                placeholder="All"
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
                </div>

                <div className="pl-lg-4">
                  <Row>
                    <Col>
                      <Field name="description">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                  Description
                              </label>
                              <ReactQuill
                                className="form-control-alternative"
                                handleBlur={() => handleBlur(
                                  { target: { name: "description" }},
                                )}
                                value={values.description}
                                handleChange={value =>
                                  form.setFieldValue(field.name, value, true)
                                }
                                placeholder="description for video"
                                disabled={isView || isLoadingSave}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback
                                  style={{
                                    marginTop: '3.50rem',
                                  }}
                                >
                                  {errors.description}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  <hr className="my-4 mt-3"/>
                  <h6 className="heading-small text-muted mb-4">
                    Videos
                  </h6>
                  <div className="pl-lg-4">
                    {!isView && (
                      <Row>
                        <Col>
                          <Button
                            block
                            color="primary"
                            className="btn-icon btn-3 my-4"
                            size="lg"
                            onClick={handleUploadVideos}
                          >
                            <span className="btn-inner--text">
                          Upload Videos
                            </span>
                            <span className="btn-inner--icon">
                              <i className="ni ni-camera-compact"/>
                            </span>
                          </Button>
                          {_get(errors, 'videos_data', '') && (
                            <FormFeedback>
                              {errors.videos_data._id}
                            </FormFeedback>
                          )}
                        </Col>
                      </Row>
                    )}
                    <Row>
                      {_get(values, 'videos_data', []).map((video, i) => (
                        <Col lg="4" key={i}>
                          {!isView && (
                            <Badge
                              bg="danger"
                              className="badge-circle bg-danger
                            text-white image-badge badge-floating border-white"
                              onClick={() => handleRemoveVideo(video._id)}
                            >
                              <i className="ni ni-fat-remove"/>
                            </Badge>
                          )}
                          <div className="img-fluid rounded shadow" style={{ width: "600px", height: "300px"}}>
                            <ReactPlayer controls={true} url={_get(video, 'file_url', '')} width={"100%"} height={"100%"}  />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
                <hr className="my-4"/>
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
        maxFileSize={1000}
        maxNumberOfFiles={50 - _get(videoCount, 'data', 0)}
        acceptFileTypes={videoTypes}
        open={videoUploadModal}
        isMulti={true}
        axiosMethod="post"
        handleClose={toggleVideoModal}
        uploadUrl={"storage-file/multiple-files"}
        setOpenImageModal={setVideoModalOpen}
        handleUploadDone={handleUploadDone}
        setIsLoadingMultiFiles={setIsLoadingMultiFiles}
      />
      {(isLoadingUpdateFile || isMultiFilesUploading) && <ProcessingModal />}
    </Container>
  );
};

export { VideoFormMulti };