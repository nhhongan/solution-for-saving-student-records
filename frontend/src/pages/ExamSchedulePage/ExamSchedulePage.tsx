import React, { useState } from "react";
import Table, { Row, TableType } from "components/Table/Table";
import FilterForm from "components/FilterForm/FilterForm";
import SelectInput from "components/FilterForm/SelectInput";
import CheckboxInput, { CheckboxInputGroup } from "components/FilterForm/CheckboxInput";

const ExamSchedulePage: React.FC = () => {
  const [semester, setSemester] = useState("");
  const [examination, setExamination] = useState<string>("midterm");

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Fetch courses based on filters
  };

  const contents: Row[] = []; 
  for (let i = 0; i < 10; i++) {
    const row = new Row();
    row.cols.push({name: 'CSC130', rowSpan: 1});
    row.cols.push({name: 'Introduction to Computer Science', rowSpan: 1});
    row.cols.push({name: '2021-07-01', rowSpan: 1});
    row.cols.push({name: '7:30', rowSpan: 1});
    row.cols.push({name: 'A1', rowSpan: 1});
    contents.push(row);
  }
  return (
    <div className="examschedule-page page">
      <FilterForm>
        <SelectInput
          id="semester"
          label="Semester"
          handleValueChange={(e) => setSemester(e.target.value)} 
          value={semester}/>
        <CheckboxInputGroup id={"examination"} label={"Examination"}>
          <CheckboxInput 
            id="midterm" 
            currentvalue={examination}
            value="midterm" 
            label="Midterm"
            handleValueChange={(value) => setExamination(value)}/>
          <CheckboxInput 
            id="final" 
            currentvalue={examination}
            value="final" 
            label="Final"
            handleValueChange={(value) => setExamination(value)}/>
        </CheckboxInputGroup>
      </FilterForm>
      <Table 
        headers={["Course ID", "Course Name", "Exam Date", "Start Hour", "Room"]}
        type={TableType.Type1}
        contents={contents}/>
    </div>
  );
};

export default ExamSchedulePage;
