import React from 'react';

const SelectTile = (props) => {
  return(
    <option value={props.id} name="selectedUser">{props.firstName} {props.lastName}</option>
  );
};

export default SelectTile;
