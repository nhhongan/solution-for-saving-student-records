import { useState } from 'react';
import check_icon from 'assets/images/square-check-solid 1.svg';
import SelectInput from 'components/FilterForm/SelectInput';
import FilterForm from 'components/FilterForm/FilterForm';
import TextInput from 'components/FilterForm/TextInput';
import Table, { Row, TableType } from 'components/Table/Table';

interface Course {
    id: string;
    name: string;
    credits: number;
    slots: number;
    description: string;
    lecturer: string
}

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

const headers = ['Course Id', 'Course Name', 'Credits', 'Slots', 'Description', 'Lecturers']
function CourseRegisPage() {
    // Create a list of courses
    
    const [courseid, setCourseId] = useState('');
    const [faculty, setFaculty] = useState('');
    
    const contents: Row[] = []
    for (const course of filteredCourses) {
        const row = new Row();
        row.cols.push({name: course.id, rowSpan: 1});
        row.cols.push({name: course.name, rowSpan: 1});
        row.cols.push({name: course.credits.toString(), rowSpan: 1});
        row.cols.push({name: course.slots.toString(), rowSpan: 1});
        row.cols.push({name: course.description, rowSpan: 1});
        row.cols.push({name: course.lecturer, rowSpan: 1});
        contents.push(row);
    }
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
            <FilterForm >
                <Table headers={headers} type={TableType.EDITABLE} contents={contents}/>
                <button id='submit' type="submit">
                    Save Registration<img src={check_icon} alt="check icon" />
                </button>
            </FilterForm>
        </div>
    );
}

export default CourseRegisPage;
