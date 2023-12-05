import { useState } from 'react';
import check_icon from 'assets/images/square-check-solid 1.svg';
import SelectInput from 'components/FilterForm/SelectInput';
import FilterForm from 'components/FilterForm/FilterForm';
import TextInput from 'components/FilterForm/TextInput';

interface Course {
    id: string;
    name: string;
    credits: number;
    slots: number;
    description: string;
    lecturer: string
}

function CourseRegisPage() {
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
    
    const [courseid, setCourseId] = useState('');
    const [faculty, setFaculty] = useState('');
    const [courses, setCourses] = useState<Course[]>(filteredCourses);
    
    return (
        <div className="regis-page page">
            <FilterForm>
                <TextInput 
                    id={'course'} 
                    label="Course Id"
                    value={courseid} 
                    handleValueChange={(e)=>setCourseId(e.target.value)} />
                <SelectInput 
                    id={'faculty'} 
                    label="Faculty"
                    value={faculty} 
                    handleValueChange={(e)=>setFaculty(e.target.value)} />
            </FilterForm>
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

export default CourseRegisPage;
