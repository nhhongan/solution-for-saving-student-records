import { useState } from 'react';
import SelectInput from 'components/FilterForm/SelectInput';
import FilterForm, { FormType } from 'components/FilterForm/FilterForm';
import TextInput from 'components/FilterForm/TextInput';
import Table, { Row, TableType } from 'components/Table/Table';
import Class from 'models/Class';
import { getClass } from 'api';

const headers = ['Course Id', 'Course Name', 'Credits', 'Slots', 'Time', 'Lecturers']

const rowGenerator = (courses: Class[]): Row[] => {
    let contents: Row[] = [];
    for (const course of courses) {
        const row = new Row();
        row.cols.push({name: course.cid? course.cid : ''});
        row.cols.push({name: course.cname});
        row.cols.push({name: course.credit.toString()});
        row.cols.push({name: course.slot?.toString() ?? ''});
        row.cols.push({name: course.day});
        row.cols.push({name: course.pname});
        contents.push(row);
    }
    return contents;
}
function CourseRegisPage() {
    // Create a list of courses
    
    const [courseid, setCourseId] = useState('');
    // const [faculty, setFaculty] = useState('');
    const [contents, setContents] = useState<Row[]>([]);
    const user = localStorage.getItem('user');

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user) {
            getClass(courseid as string)
            .then((res) => {
            const courses: Class[] = res.data;
    
            setContents(rowGenerator(courses));
            });
        }
    }

    return (
        <div className="regis-page page">
            <FilterForm onSubmit={handleFilter}>
                <TextInput 
                    id={'course'} 
                    label="Course Id"
                    value={courseid} 
                    handleValueChange={(e)=>setCourseId(e.target.value)} />
                {/* <SelectInput 
                    id={'faculty'} 
                    label="Faculty"
                    value={faculty} 
                    handleValueChange={(e)=>setFaculty(e.target.value)} /> */}
            </FilterForm>
            <FilterForm type={FormType.SUBMIT}>
                <Table headers={headers} type={TableType.EDITABLE} contents={contents}/>
            </FilterForm>
        </div>
    );
}

export default CourseRegisPage;
