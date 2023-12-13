import { getMajorProgram } from 'api';
import Table, { Row, TableType } from 'components/Table/Table';
import CourseProgram from 'models/CourseProgram';
import React, { useEffect } from 'react';

const headers = ["Course ID", "Course Name", "Credits", "Semester", "Elective", "Learnt"]
const cvtCourseProgram2Row = (courseProgram: CourseProgram): Row => {
  const row = new Row();
  row.cols.push({ name: courseProgram.cid });
  row.cols.push({ name: courseProgram.cname });
  row.cols.push({ name: courseProgram.credit.toString()});
  row.cols.push({ name: courseProgram.semester.toString() });
  row.cols.push({ name: courseProgram.elective ? 'Yes' : 'No' });
  row.cols.push({ name: courseProgram.learnt ? 'Yes' : 'No' });
  return row;
}

const CourseProgramPage: React.FC = () => {
  const program = 'Data Science';
  const school_year = '2022-2026';
  const [contents, setContents] = React.useState<Row[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
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
  },[])
  return (
    <div className='page'>
      <h2 className='title'>{program} {school_year}</h2>
      <Table headers={headers} type={TableType.Type1} contents={contents}/>
    </div>
  );
};

export default CourseProgramPage;
