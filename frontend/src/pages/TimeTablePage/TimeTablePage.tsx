import './TimeTablePage.scss'
import React, { useState } from 'react';
import filter_icon from 'assets/images/filter-icon.svg';
import caret_down from 'assets/images/caret-down-solid.svg';
import check_icon from 'assets/images/square-check-solid 1.svg';

interface Course {
    id: string;
    name: string;
    credits: number;
    slots: number;
    description: string;
    lecturer: string
}

function TimeTablePage() {
    // Create a list of courses
    const filteredCourses: Course[] = [
        {
            id: "CSE101",
            name: "Introduction to Computer Science",
            credits: 3,
            slots: 50,
            description: "An introduction to the fundamental concepts of computer science.",
            lecturer: "John Doe"
        },
        {
            id: "MTH201",
            name: "Calculus I",
            credits: 4,
            slots: 40,
            description: "A course on differential and integral calculus.",
            lecturer: "Jane Smith"
        },
        {
            id: "ENG101",
            name: "English Composition",
            credits: 3,
            slots: 30,
            description: "A course on writing and composition.",
            lecturer: "Bob Johnson"
        }
    ];
    
    const [week, setWeek] = useState('');
    const [semester, setSemester] = useState('');
    const [courses, setCourses] = useState<Course[]>(filteredCourses);
    // setCourses(filteredCourses);
    
    const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeek(event.target.value);
    };

    const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(event.target.value);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Fetch courses based on filters
    };
    
    return (
        <div className="timetable-page">
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
            <form className='course-regis-table input-form'>    
                {courses ? (
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>Credits</th>
                                <th>Slots</th>
                                <th>Description</th>
                                <th>Lecturers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox"/></td>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td>{course.credits}</td>
                                    <td>{course.slots}</td>
                                    <td>{course.description}</td>
                                    <td>{course.lecturer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No courses found.</p>
                )}
                <button id='submit' type="submit">
                        Save Registration<img src={check_icon} alt="check icon" />
                </button>
            </form>
        </div>
    );
}

export default TimeTablePage;
