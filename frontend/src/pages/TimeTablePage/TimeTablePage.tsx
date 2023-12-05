import './TimeTablePage.scss'
import React, { useState } from 'react';
import filter_icon from 'assets/images/filter-icon.svg';
import caret_down from 'assets/images/caret-down-solid.svg';
import TimeTable from 'components/TimeTable/TimeTable';

interface Course {
    id: string;
    name: string;
    credits: number;
    slots: number;
    description: string;
    lecturer: string;
    start: number;
    end: number;
}

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
            <TimeTable />
        </div>
    );
}

export default TimeTablePage;
