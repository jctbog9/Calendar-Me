import React from 'react';

export const TextField = (props) => {
  return (
    <div className={props.className}>
      <label>
        {props.label}
        <input type={props.type} onChange={props.onChange} name={props.name} value={props.value}/>
      </label>
    </div>
  );
};

export default TextField;
