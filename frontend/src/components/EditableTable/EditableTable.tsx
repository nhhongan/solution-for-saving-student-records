import { Row } from "components/Table/Table";
import "../Table/Table.scss";
import { useState } from "react";

type TableProps = {
  headers: string[];
  contents?: Row[];
  onRowClick: (id: string) => void;
  selectedIds: string[];
};

const Editable: React.FC<TableProps> = ({
  headers,
  contents,
  onRowClick,
  selectedIds,
}) => {
  const CheckBox = ({ id }: { id: string }) => {
    // const [checked, setChecked] = useState(false);
    const handleCheck = () => {
      onRowClick(id);
    };
    return (
      <td>
        <input
          type="checkbox"
          checked={selectedIds.includes(id) ? true : false}
          onChange={handleCheck}
        />
      </td>
    );
  };
  return (
      <div className="table-wrapper">
        <table className={`table editable`} cellSpacing={0}>
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
                <CheckBox id={row.cols[0].name} />
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

export default Editable;
