
import './TimeTable.scss';

type Course = {
  id: string;
  name: string;
  credits: number;
  slots: number;
  description: string;
  lecturer: string;
  day: string;
  start: number;
  duration: number;
}

type Col = {
  name: string,
  rowSpan: number,
}
class Row {
  cols: Col[];

  constructor() {
    this.cols = []
  }
}
const courses: Course[] = [
  {
    id: '1',
    name: 'Probability',
    credits: 3,
    slots: 2,
    description: 'Probability and Mathematical Statistics',
    lecturer: 'Nguyen Van B',
    day: 'Tue',
    start: 1,
    duration: 3,
  },
  {
    id: '2',
    name: 'Probability',
    credits: 3,
    slots: 2,
    description: 'Probability and Mathematical Statistics',
    lecturer: 'Nguyen Van B',
    day: 'Tue',
    start: 5,
    duration: 3,
  },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const rowGenerator = (courses: Course[]) => {
  // Create emtpy rows which has 8 columns, the first one is the order of the row
  // There are 10 rows in total
  let rows: Row[]= [];
  for (let i = 1; i <= 10; i++)
  {
    // Generate an empty row
    const row = new Row();
    // Iterate through each day (col)
    // If there is a course that matches the day and start time, add it to the row
    days.forEach(day => {
      const found = courses.find(course => course.day === day && course.start === i)
      if (found) {
        row.cols.push({ name: found.name, rowSpan: found.duration })
      } else {
        row.cols.push({ name: '', rowSpan: 1 })
      }
    })

    rows.push(row);
  }
  return rows
}
const TimeTable = ({ }) => {
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
            {rowGenerator(courses).map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {row.cols.map((col, index) => (
                  <td className={col.name && "course"} key={index} rowSpan={col.rowSpan}>{col.name}</td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
