import { useEffect, useState } from "react";

import FilterForm, { FormType } from "components/FilterForm/FilterForm";
import TextInput from "components/FilterForm/TextInput";
import Table, { Row, TableType } from "components/Table/Table";
import EditTable from "components/EditableTable/EditableTable";
import Class from "models/Class";
import { getClass } from "api";

const headers = [
  "Course Id",
  "Course Name",
  "Credits",
  "Slots",
  "Time",
  "Lecturers",
];

const rowGenerator = (courses: Class[]): Row[] => {
  let contents: Row[] = [];
  for (const course of courses) {
    const row = new Row();
    row.cols.push({ name: course.cid ? course.cid : "" });
    row.cols.push({ name: course.cname });
    row.cols.push({ name: course.credit.toString() });
    row.cols.push({ name: course.slot?.toString() ?? "" });
    row.cols.push({ name: course.day });
    row.cols.push({ name: course.pname });
    contents.push(row);
  }
  return contents;
};
function CourseRegisPage() {
  // Create a list of courses

  const [courseid, setCourseId] = useState("");
  const [contents, setContents] = useState<Row[]>([]);
  const user = localStorage.getItem("user");
  const [selectedIds, setIds] = useState<string[]>([]);
  const [selectedCourses, setCourses] = useState<Class[]>([]);
  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      getClass(courseid as string).then((res) => {
        const courses: Class[] = res.data;

        setContents(rowGenerator(courses));
      });
    }
  };
  const handleRowClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setIds(selectedIds.filter((selectedId) => selectedId !== id));
      setCourses(
        selectedCourses.filter((selectedCourse) => selectedCourse.cid !== id)
      );
    } else {
      setIds([...selectedIds, id]);
      const course = contents.find((content) => content.cols[0].name === id);
      if (course) {
        const newCourse: Class = {
          cid: course.cols[0].name,
          cname: course.cols[1].name,
          credit: parseInt(course.cols[2].name),
          slot: parseInt(course.cols[3].name),
          day: course.cols[4].name,
          pname: course.cols[5].name,
          class_id: "",
          room: "",
          start_period: 0,
          end_period: 0,
          semester: "",
        };
        setCourses([...selectedCourses, newCourse]);
      }
    }
  };
  return (
    <div className="regis-page page">
      <FilterForm onSubmit={handleFilter}>
        <TextInput
          id={"course"}
          label="Course Id"
          value={courseid}
          handleValueChange={(e) => setCourseId(e.target.value)}
        />
        {/* <SelectInput 
                    id={'faculty'} 
                    label="Faculty"
                    value={faculty} 
                    handleValueChange={(e)=>setFaculty(e.target.value)} /> */}
      </FilterForm>
      <FilterForm type={FormType.SUBMIT}>
        <EditTable
          headers={headers}
          contents={contents}
          onRowClick={handleRowClick}
          selectedIds={selectedIds}
        />
      </FilterForm>
      {selectedIds.length > 0 && (
        <Table
          headers={headers}
          type={TableType.Type1}
          contents={rowGenerator(selectedCourses)}
        />
      )}
    </div>
  );
}

export default CourseRegisPage;
