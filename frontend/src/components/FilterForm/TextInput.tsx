import React from 'react';

type TextInputProps = {
    id: string;
    label: string;
    value: string
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({id, label, value, handleValueChange}) => {
  return (
    <div className='form-group' id={'form-'+id}>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} value={value} onChange={handleValueChange} />
    </div>
  );
};

export default TextInput;
