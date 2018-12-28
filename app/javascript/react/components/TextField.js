import React from 'react';

export const TextField = (props) => {
  return (
    <div>
      <label>
        {props.label}
        <input type="text" onChange={props.onChange} name={props.name} value={props.value}/>
      </label>
    </div>
  );
};

export default TextField;
