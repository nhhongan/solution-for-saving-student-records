import React, { useEffect } from 'react';
import './MarksPage.scss';
import Table, { Row, TableType } from 'components/Table/Table';
import FilterForm from 'components/FilterForm/FilterForm';
import SelectInput from 'components/FilterForm/SelectInput';
import { getStudentMarks } from 'api';
import Mark from 'models/Mark';

// const headers = ['Course ID', 'Course Name', 'Credit', '% KT', '% Thi', 'Bài tập', 'Kiểm tra', 'Thi L1', 'TK1(10)', 'TK(10)', 'TK1(CH)', 'TK(CH)']
const headers = ['Course ID', 'Course Name', 'Credit', 'In Class', 'Midterm', 'Final', 'GPA', 'Status']
const rowGenerator = (mark: Mark): Row => {
    const row = new Row();
    row.cols.push({ name: mark.cid });
    row.cols.push({ name: mark.cname });
    row.cols.push({ name: mark.credit.toString() });
    row.cols.push({ name: mark.inclass.toString() });
    row.cols.push({ name: mark.midterm.toString() });
    row.cols.push({ name: mark.final.toString() });
    row.cols.push({ name: mark.gpa.toString() });
    row.cols.push({ name: mark.status });
    return row;
}
const MarksPage: React.FC = () => {
    const [semester, setSemester] = React.useState<string>('');
    const [contents, setContents] = React.useState<Row[]>([]);
    const user = localStorage.getItem('user');
    useEffect(() => {
        if (user) {
            const userObj = JSON.parse(user);
            const sid = userObj.sid;
            getStudentMarks(sid as string).then((res) => {
              const marks: Mark[] = res.data;
              const rows: Row[] = [];
              marks.forEach((exam) => {
                rows.push(rowGenerator(exam));
              });
              setContents(rows);
            })
          }
    }, [])
    // const summary: Record<string, string> = {
    //     "Điểm trung bình học kỳ hệ 10/100": "9.0",
    //     "Điểm trung bình học kỳ hệ 4": "3.46",
    //     "Điểm trung bình tích lũy:": "83.2",
    //     "Điểm trung bình tích lũy hệ 4": "3.46",
    //     "Số tín chỉ đạt": "24",
    //     "Số tín chỉ tích lũy": "33",
    //     "Phân loại điểm trung bình học kỳ": "Giỏi"
    // }
    return (
        <div className="page" id="marks-page">
            <FilterForm>
                <SelectInput
                id="semester"
                label="Semester"
                handleValueChange={(e) => setSemester(e.target.value)} 
                value={semester}/>
            </FilterForm>
            <Table headers={headers} type={TableType.Type3} contents={contents}/>
            {/* <div className="grid-container">
                {Object.keys(summary).map((key, index) => {
                    return (
                        <>
                            <div className="grid-item">{key}</div>
                            <div className="grid-item">{summary[key]}</div>
                        </>
                    );
                })}
            </div> */}
        </div>
    );
};

export default MarksPage;
