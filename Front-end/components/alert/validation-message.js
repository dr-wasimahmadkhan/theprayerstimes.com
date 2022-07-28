import React from 'react';

type Props = {
  heading?: string,
  errors: Array<any>,
};

const ValidationMessage = (props: Props) => {
  const { heading, errors } = props;
  const errorArray = Object.values(errors);
  return (
    <React.Fragment>
      <h1 className="fzl fwm">{heading}</h1>
      <ul style={{ listStyleType: 'circle' }}>
        {errorArray &&
          errorArray.length > 0 &&
          errorArray.map(error => <li>{error}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default ValidationMessage;
