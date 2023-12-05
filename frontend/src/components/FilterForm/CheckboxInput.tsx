import * as React from 'react';

interface CheckboxInputProps {
    id: string;
    label: string;
    currentvalue: string;
    value: string;
    handleValueChange: (value: string) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({id, label, currentvalue, value, handleValueChange}) => {
  return (
    // JSX for your component goes here
    <div className="checkbox">
        <input
            type="checkbox"
            id={"checkbox-"+id}
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            checked={currentvalue === value}
        />
        <label htmlFor={"checkbox-"+id}>{label}</label>
    </div>
  );
};

type CheckboxInputGroupProps = {
    id: string;
    label: string;
    children: React.ReactElement<CheckboxInputProps>[] | React.ReactElement<CheckboxInputProps>;
}
export const CheckboxInputGroup: React.FC<CheckboxInputGroupProps> = ({id, label, children}) => {
    return (
        <div className="form-group" id={"form-"+id}>
          <label>{label}</label>
          {children}
        </div>
    )
}
export default CheckboxInput;
