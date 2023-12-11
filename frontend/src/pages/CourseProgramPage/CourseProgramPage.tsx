import Table, { Row, TableType } from 'components/Table/Table';
import React from 'react';

const headers = ["Course ID", "Course Name", "Credits", "Semester", "Elective", "Learnt"]
const CourseProgramPage: React.FC = () => {
  const program = 'Data Science';
  const school_year = '2022-2026';
  const contents: Row[] = []
  for (let i = 0; i < 3; i++) {
    const row = new Row();
    row.cols.push({name: 'IT135IU', rowSpan: 1});
    row.cols.push({name: 'Probability', rowSpan: 1});
    row.cols.push({name: '3', rowSpan: 1});
    row.cols.push({name: '1', rowSpan: 1});
    row.cols.push({name: 'Yes', rowSpan: 1});
    row.cols.push({name: 'Yes', rowSpan: 1});
    contents.push(row);
  }
  return (
    <div className='page'>
      <h2 className='title'>{program} {school_year}</h2>
      <Table headers={headers} type={TableType.Type1} contents={contents}/>
    </div>
  );
};

export default CourseProgramPage;
