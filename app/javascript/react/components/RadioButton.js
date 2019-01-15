import React from 'react';

export const RadioButton = (props) => {
  return (
    <div>
      <label>
        <input type="radio" onChange={props.onChange} name={props.name} value={props.value}/>
        {props.label}
      </label>
    </div>
  );
};

export default RadioButton;
