import "./Table.scss";

export enum TableType {
  Type1 = "type-1",
  Type2 = "type-2",
  Type3 = "type-3",
  EDITABLE = "editable",
  TimeTable = "timetable",
}

export enum RowType {
  Standard = "standard",
  Aggregate = "aggregate",
}
export type Col = {
  name: string;
  rowSpan?: number;
  colSpan?: number;
};

export class Row {
  cols: Col[];
  type: RowType;
  constructor(type: RowType = RowType.Standard) {
    this.cols = [];
    this.type = type;
  }
}

type TableProps = {
  headers: string[];
  contents?: Row[];
  type: TableType;
};

const Table: React.FC<TableProps> = ({ headers, contents, type }) => {
  const IndexCell = ({value}: {value: any}) => {
    if (type === TableType.EDITABLE) {
      return <td><input type="checkbox" /></td>;
    } else {
      return <td>{value}</td>;
    }
  }
  return (
    <div className="table-wrapper">
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
              
              { row.type !== RowType.Aggregate && 
                <IndexCell value={index + 1}/>
              }
              {row.cols.map((col, index) => (
                <td
                  className={col.name && "course"}
                  key={index}
                  rowSpan={col.rowSpan}
                  colSpan={col.colSpan}
                >
                  {col.name}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
