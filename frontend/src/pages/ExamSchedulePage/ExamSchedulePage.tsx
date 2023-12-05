import React, { useState } from "react";
import filter_icon from "assets/images/filter-icon.svg";
import caret_down from "assets/images/caret-down-solid.svg";
import Table, { Row } from "components/Table/Table";

const ExamSchedulePage: React.FC = () => {
  const [semester, setSemester] = useState("");
  const [examination, setExamination] = useState<string>("midterm");

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
  };

  const handleExaminationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const _course = event.target.value;
    setExamination(_course);
  };

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
      <form onSubmit={handleFilter} className="input-form">
        <div className="form-group" id="form-semester">
          <label htmlFor="semester">Semester</label>
          <input
            type="text"
            id="semester"
            value={semester}
            onChange={handleSemesterChange}
          />
          <img src={caret_down} alt="test" />
        </div>
        <div className="form-group" id="form-examination">
          <label htmlFor="midtermCheckbox">Examniation</label>
          <div className="checkbox">
            <input
              type="checkbox"
              id="midtermCheckbox"
              value="midterm"
              onChange={handleExaminationChange}
              checked={examination === "midterm"}
            />
            <label htmlFor="finalCheckbox">Midterm</label>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              id="finalCheckbox"
              value="final"
              onChange={handleExaminationChange}
              checked={examination === "final"}
            />
            <label htmlFor="course2">Final</label>
          </div>
        </div>
        <button id="submit" type="submit">
          Filter
          <img src={filter_icon} alt="test" />
        </button>
      </form>
      <Table 
        headers={["Course ID", "Course Name", "Exam Date", "Start Hour", "Room"]} 
        contents={contents}/>
    </div>
  );
};

export default ExamSchedulePage;
