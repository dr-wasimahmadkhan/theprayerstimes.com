import React from 'react';
import Head from 'next/head';
import _get from 'lodash.get';

type Props = {
    mosqueDataToPrint: any,
};

const Letter = (props: Props) => {
  const { mosqueDataToPrint } = props;
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/admin-css/letter.css" />
      </Head>
      <div className={`team-boxed ${!_get(mosqueDataToPrint, '_id') && 'display-none'}`}  id="divToPrint">
        <div className="container">
          <div className="intro">
            <h1 className="text-center ">Greetings. </h1>
            <p className="text-center">Welcome to Prayer Times</p>
          </div>
          <div className="row people text-center">
            <div className="col-md-12 col-lg-12 item">
              <div className="box"><img className="rounded-circle" src="assets/img/1.jpg" />
                <h3 className="name fontSize">Hi {_get(mosqueDataToPrint, 'user_id.full_name', '')}</h3>
                <p className="title fontSize">{_get(mosqueDataToPrint, 'name', '')}</p>
                <p className="description w-100 fontSize m-3">
                          This is your verification code <strong>{_get(mosqueDataToPrint, 'user_id.verification_code', '')}.</strong> Please go to login screen with your email password and enter this verification code to login to your dashboard and activate your account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Letter;