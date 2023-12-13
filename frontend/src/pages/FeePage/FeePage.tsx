import FilterForm from 'components/FilterForm/FilterForm';
import SelectInput from 'components/FilterForm/SelectInput';
import Table, { Row, RowType, TableType } from 'components/Table/Table';
import React from 'react';

const headers = ["Semester", "Tuition", "Exemption", "Receivable", "Collected", "Owe"]

const FeePage: React.FC = () => {
  const [semester, setSemester] = React.useState<string>('');
  const contents: Row[] = []; 
  for (let i = 0; i < 3; i++) {
    const row = new Row();
    row.cols.push({name: '1, 22-23', rowSpan: 1});
    row.cols.push({name: '3,000,000', rowSpan: 1});
    row.cols.push({name: '0', rowSpan: 1});
    row.cols.push({name: '3,000,000', rowSpan: 1});
    row.cols.push({name: '0', rowSpan: 1});
    row.cols.push({name: '3,000,000', rowSpan: 1});
    contents.push(row);
  }
  const aggreGateRow = new Row(RowType.Aggregate);
  aggreGateRow.cols.push({name: 'All', rowSpan: 1, colSpan: 2});
  aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  aggreGateRow.cols.push({name: '0', rowSpan: 1});
  aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  aggreGateRow.cols.push({name: '0', rowSpan: 1});
  aggreGateRow.cols.push({name: '9,000,000', rowSpan: 1});
  contents.push(aggreGateRow);
  return (
    <div className='page'>
      <FilterForm>
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
