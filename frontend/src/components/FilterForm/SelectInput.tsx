import React from 'react';
import caret_down from 'assets/images/caret-down-solid.svg';

type SelectInputProps = {
    id: string;
    label: string;
    value: string;
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({id, label, value, handleValueChange}) => {
  return (
    <div className='form-group' id={'form-'+id}>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} value={value} onChange={handleValueChange} />
        <img src={caret_down} alt="test" />
    </div>
  );
};

export default SelectInput;
