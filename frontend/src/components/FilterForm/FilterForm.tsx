import React from "react";
import filter_icon from "assets/images/filter-icon.svg";

type FilterFormProps = {
  children: React.ReactNode;
};
const FilterForm: React.FC<FilterFormProps> = ({ children }) => {
  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Fetch courses based on filters
  };
  return (
    <form onSubmit={handleFilter} className="input-form">
      {/* <div className="input-wrapper"> */}
      {children}
      {/* </div> */}
      <button id="submit" type="submit">
        Filter
        <img src={filter_icon} alt="test" />
      </button>
    </form>
  );
};

export default FilterForm;
