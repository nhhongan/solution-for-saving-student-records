import { getFee } from 'api';
import FilterForm from 'components/FilterForm/FilterForm';
import SelectInput from 'components/FilterForm/SelectInput';
import Table, { Row, RowType, TableType } from 'components/Table/Table';
import Class from 'models/Class';
import React, { useEffect } from 'react';

const headers = ["Course ID", "Course Name", "Credit", "Semester", "Fee"]

const rowGenerator = (courses: Class[]): Row[] => {
  let contents: Row[] = [];
  for (const course of courses) {
    const row = new Row();
    row.cols.push({name: course.cid? course.cid : ''});
    row.cols.push({name: course.cname});
    row.cols.push({name: course.credit? course.credit.toString() : ''});
    row.cols.push({name: course.semester});
    row.cols.push({name: course.fee? course.fee.toLocaleString() : ''});
    contents.push(row);
  }
  return contents;
}
const FeePage: React.FC = () => {
  const [semester, setSemester] = React.useState<string>('');
  const [contents, setContents] = React.useState<Row[]>([]);
  const user = localStorage.getItem('user');
  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      const userObj = JSON.parse(user);
      const sid = userObj.sid;
      getFee(sid as string, semester)
      .then((res): void => {
        console.log(res.data);
        const courses: Class[] = res.data.tuition_fees;
        const aggreGateRow = new Row(RowType.Aggregate);
        aggreGateRow.cols.push({name: "", rowSpan: 1, colSpan: 3});
        aggreGateRow.cols.push({name: 'Total', colSpan: 2});
        aggreGateRow.cols.push({name: res.data.total_fee.toLocaleString(), rowSpan: 1});
        const result = rowGenerator(courses);
        result.push(aggreGateRow);
        setContents(result);
      });
    }
  }
  // const contents: Row[] = []; 
  // for (let i = 0; i < 3; i++) {
  //   const row = new Row();
  //   row.cols.push({name: '1, 22-23', rowSpan: 1});
  //   row.cols.push({name: '3,000,000', rowSpan: 1});
  //   row.cols.push({name: '0', rowSpan: 1});
  //   row.cols.push({name: '3,000,000', rowSpan: 1});
  //   row.cols.push({name: '0', rowSpan: 1});
  //   row.cols.push({name: '3,000,000', rowSpan: 1});
  //   contents.push(row);
  // }
  // const aggreGateRow = new Row(RowType.Aggregate);
  // aggreGateRow.cols.push({name: 'All', rowSpan: 1, colSpan: 2});
  // aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  // aggreGateRow.cols.push({name: '0', rowSpan: 1});
  // aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  // aggreGateRow.cols.push({name: '0', rowSpan: 1});
  // aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  // contents.push(aggreGateRow);
  return (
    <div className='page'>
      <FilterForm onSubmit={handleFilter}>
        <SelectInput
          id="semester"
          label="Semester"
          handleValueChange={(e) => setSemester(e.target.value)} 
          value={semester}/>
      </FilterForm>
      <Table headers={headers} 
      type={TableType.Type1} 
      contents={contents}/>
    </div>
  );  
};

export default FeePage;
