import React from 'react';
import MarketingTemplate from "@/layouts/marketing-template";
import { ContactForm } from './components';
import {validateContactForm} from './validation';
import {Formik} from "formik";
import { useMutation } from "react-query";
import { CREATE_CONTACT } from './queries';
import {Message} from "@/components/alert/message";
import MyComponent from "react-fullpage-custom-loader";

const Contact = () => {
  const { mutate: createContact, isLoading: isLoadingSave } = useMutation(CREATE_CONTACT);
  return (
    <MarketingTemplate title="Contact">
      <div className="wpo-breadcumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Contact Us</h2>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><span>Contact</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="wpo-contact-form-map section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="contact-form">
                    <h2>Get In Touch</h2>
                    <Formik
                      initialValues={{
                        full_name: '',
                        email: '',
                        subject: '',
                        message: '',
                      }}
                      validationSchema={validateContactForm}
                      onSubmit={async (values, actions) => {
                        await createContact(values, {
                          onSuccess: res => {
                            Message.success(res);
                          },
                          onError: err => {
                            Message.error(err);
                            actions.resetForm();
                          },
                        });
                        actions.resetForm();
                      }}
                    >
                      {formikProps => {
                        return (
                          <ContactForm {...formikProps} isLoadingSave={isLoadingSave} />
                        );}}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isLoadingSave && <MyComponent width={"100%"} height={"100%"}/>}
    </MarketingTemplate>
  );
};

export default Contact;