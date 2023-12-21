import React, { useEffect, useState } from "react";
import Table, { Row, TableType } from "components/Table/Table";
import FilterForm from "components/FilterForm/FilterForm";
import SelectInput from "components/FilterForm/SelectInput";
import CheckboxInput, { CheckboxInputGroup } from "components/FilterForm/CheckboxInput";
import { getExamSchedule } from "api";
import { Exam } from "models/Exam";

const rowGenerator = (exam: Exam): Row => {
  const row = new Row();
  row.cols.push({ name: exam.cid });
  row.cols.push({ name: exam.cname });
  row.cols.push({ name: exam.day });
  row.cols.push({ name: exam.time });
  row.cols.push({ name: exam.room });
  return row;
}
const ExamSchedulePage: React.FC = () => {
  const [semester, setSemester] = useState("");
  const [examination, setExamination] = useState<string>("midterm");
  const [contents, setContents] = useState<Row[]>([]);
  const user = localStorage.getItem('user');
  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Fetch courses based on filters
    if (user) {
      const userObj = JSON.parse(user);
      const sid = userObj.sid;
      getExamSchedule(sid as string).then((res) => {
        const examSchedule: Exam[] = res.data;
        const rows: Row[] = [];
        examSchedule.forEach((exam) => {
          rows.push(rowGenerator(exam));
        });
        setContents(rows);
      })
    }
  };
  return (
    <div className="examschedule-page page">
      <FilterForm onSubmit={handleFilter}>
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
