import './TimeTablePage.scss'
import React, { useState } from 'react';
import filter_icon from 'assets/images/filter-icon.svg';
import caret_down from 'assets/images/caret-down-solid.svg';
import Table, { Row, TableType } from 'components/Table/Table';

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

function TimeTablePage() {
    // create an array of days in a week with abbreviation
    const [semester, setSemester] = useState('');

    const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(event.target.value);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Fetch courses based on filters
    };

    return (
        <div className="timetable-page page">
            <form onSubmit={handleFilter} className='input-form'>
                <div className='form-group' id='form-semester'>
                    <label htmlFor="semester">Semester</label>
                    <input type="text" id="semester" value={semester} onChange={handleSemesterChange} />
                    <img src={caret_down} alt="test" />
                </div>
                <div className='form-group' id='form-week'>
                    <label htmlFor="week">Week</label>
                    <input type="text" id="week" value={semester} onChange={handleSemesterChange} />
                    <img src={caret_down} alt="test" />
                </div>
                <button id='submit' type="submit">
                    Filter<img src={filter_icon} alt="test" />
                </button>
            </form>
            <Table 
                headers={days} 
                type={TableType.TimeTable} 
                contents={rowGenerator(courses)}/>
        </div>
    );
}

export default TimeTablePage;
