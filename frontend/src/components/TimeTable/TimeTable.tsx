
import './TimeTable.scss';

const TimeTable = ({ }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <table className='timetable' cellSpacing={0}>
      <thead>
        <tr>
          <th></th>
          {days.map((day, index) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
            {/* Add empty rows */}
            <tr>
                <td>1</td>
                <td rowSpan={2} className='course'>OOP</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
      </tbody>
    </table>
  );
};

export default TimeTable;
