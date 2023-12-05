import './Table.scss';

export type Col = {
  name: string,
  rowSpan: number,
}
export class Row {
  cols: Col[];

  constructor() {
    this.cols = []
  }
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type TableProps = {
    headers: string[],
    contents?: Row[],
}
const Table: React.FC<TableProps> = ({headers, contents}) => {  
  return (
    <table className='table type-1' cellSpacing={0}>
      <thead>
        <tr>
          <th></th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contents?.map((row, index) => (
          <tr key={index}>
          <td>{index + 1}</td>
          {row.cols.map((col, index) => (
            <td 
              className={col.name && "course"} 
              key={index} 
              rowSpan={col.rowSpan}>
              {col.name}
            </td>
          ))}
        </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;