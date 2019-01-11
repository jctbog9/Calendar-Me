import React from 'react';

export const TextField = (props) => {
  return (
    <div>
      <label className="form-label">
        {props.label}
        <input className="form-field"
               type="text"
               onChange={props.onChange}
               name={props.name}
               value={props.value}
        />
      </label>
    </div>
  );
};

export default TextField;
