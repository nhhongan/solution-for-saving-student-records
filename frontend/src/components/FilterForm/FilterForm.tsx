import React from "react";
import filter_icon from "assets/images/filter-icon.svg";
import check_icon from 'assets/images/square-check-solid 1.svg';

export enum FormType {
  FILTER = "filter",
  SUBMIT = "submit",
}

type FilterFormProps = {
  children: React.ReactNode;
  type?: FormType;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};
const FilterForm: React.FC<FilterFormProps> = ({
  children,
  type = FormType.FILTER,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="input-form">
      {/* <div className="input-wrapper"> */}
      {children}
      {/* </div> */}
      {type === FormType.FILTER ? (
        <button id="submit" type="submit">
          Filter
          <img src={filter_icon} alt="test" />
        </button>
      ) : (
        <button id="submit" type="submit">
          Save Registration
          <img src={check_icon} alt="check icon" />
        </button>
      )}
    </form>
  );
};

export default FilterForm;
