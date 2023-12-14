import './TimeTablePage.scss'
import React, { useEffect, useState } from 'react';
import filter_icon from 'assets/images/filter-icon.svg';
import caret_down from 'assets/images/caret-down-solid.svg';
import Table, { Row, TableType } from 'components/Table/Table';
import Course from 'models/Course';

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

function TimeTablePage() {
    // create an array of days in a week with abbreviation
    const [semester, setSemester] = useState('');
    const [contents, setContents] = useState<Row[]>([]);
    const user = localStorage.getItem('user');

    const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(event.target.value);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
      if (user) {
        const userObj = JSON.parse(user);
        const sid = userObj.sid;
        getMajorProgram(sid as string)
        .then((res) => {
          const coursePrograms: CourseProgram[] = res.data;
          const rows: Row[] = [];
          coursePrograms.forEach((courseProgram) => {
            rows.push(cvtCourseProgram2Row(courseProgram));
          });
          setContents(rows);
        });
      }
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
                contents={contents}/>
        </div>
    );
}

export default TimeTablePage;
