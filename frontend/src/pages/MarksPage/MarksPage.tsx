import React from 'react';
import './MarksPage.scss';
import Table, { Row, TableType } from 'components/Table/Table';
import FilterForm from 'components/FilterForm/FilterForm';
import SelectInput from 'components/FilterForm/SelectInput';

const headers = ['Mã môn học', 'Tên môn', 'TC', '% KT', '% Thi', 'Bài tập', 'Kiểm tra', 'Thi L1', 'TK1(10)', 'TK(10)', 'TK1(CH)', 'TK(CH)']
const MarksPage: React.FC = () => {
    const data: Row[] = [];
    const [semester, setSemester] = React.useState<string>('');
    for (let i = 0; i < 10; i++) {
        const row = new Row();
        row.cols.push({name: 'CSC130', rowSpan: 1});
        row.cols.push({name: 'Introduction to Computer Science', rowSpan: 1});
        row.cols.push({name: '3', rowSpan: 1});
        row.cols.push({name: '30', rowSpan: 1});
        row.cols.push({name: '30', rowSpan: 1});
        row.cols.push({name: '40', rowSpan: 1});
        row.cols.push({name: '100', rowSpan: 1});
        row.cols.push({name: '100', rowSpan: 1});
        row.cols.push({name: '9', rowSpan: 1});
        row.cols.push({name: '9', rowSpan: 1});
        row.cols.push({name: 'A', rowSpan: 1});
        row.cols.push({name: 'A', rowSpan: 1});
        data.push(row);
    }
    const summary: Record<string, string> = {
        "Điểm trung bình học kỳ hệ 10/100": "9.0",
        "Điểm trung bình học kỳ hệ 4": "3.46",
        "Điểm trung bình tích lũy:": "83.2",
        "Điểm trung bình tích lũy hệ 4": "3.46",
        "Số tín chỉ đạt": "24",
        "Số tín chỉ tích lũy": "33",
        "Phân loại điểm trung bình học kỳ": "Giỏi"
    }
    return (
        <div className="page" id="marks-page">
            <FilterForm>
                <SelectInput
                id="semester"
                label="Semester"
                handleValueChange={(e) => setSemester(e.target.value)} 
                value={semester}/>
            </FilterForm>
            <Table headers={headers} type={TableType.Type3} contents={data}/>
            <div className="grid-container">
                {Object.keys(summary).map((key, index) => {
                    return (
                        <>
                            <div className="grid-item">{key}</div>
                            <div className="grid-item">{summary[key]}</div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default MarksPage;
