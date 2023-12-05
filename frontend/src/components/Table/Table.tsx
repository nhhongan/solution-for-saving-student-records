import './Table.scss';

export enum TableType {
  Type1 = 'type-1',
  Type2 = 'type-2',
  Type3 = 'type-3',
  TimeTable = 'timetable'
}

export enum RowType {
  Standard = 'standard',
  Aggregate = 'aggregate',
}
export type Col = {
  name: string,
  rowSpan: number,
  colSpan?: number,
}

export class Row {
  cols: Col[];
  type: RowType;
  constructor(type: RowType = RowType.Standard) {
    this.cols = []
    this.type = type;
  }
}


type TableProps = {
    headers: string[],
    contents?: Row[],
    type: TableType,
}
    

const Table: React.FC<TableProps> = ({headers, contents, type}) => {  
  return (
    <table className={`table ${type}`} cellSpacing={0}>
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
          <tr key={index} className={row.type}>
            {row.type !== RowType.Aggregate && <td>{index + 1}</td>}
            {row.cols.map((col, index) => ( 
              <td 
                className={col.name && "course"} 
                key={index} 
                rowSpan={col.rowSpan}
                colSpan={col.colSpan}>
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