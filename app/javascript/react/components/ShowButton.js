import React from 'react';

export const ShowButton = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  );
};

export default ShowButton;
