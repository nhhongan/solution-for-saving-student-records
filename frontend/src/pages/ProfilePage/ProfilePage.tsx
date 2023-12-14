import { getStudentInfo } from "api";
import Student from "models/Student";
import React, { useEffect } from "react";

const ProfilePage: React.FC = () => {
  const user = localStorage.getItem("user");
  const [student, setStudent] = React.useState<Student>();
  useEffect(() => {
    if (user) {
      const userObj = JSON.parse(user);
      const sid = userObj.sid;
      getStudentInfo(sid as string).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const student = res.data;        
          setStudent(student);
        }
      });
    }
  }, []);

  return (
    <div className="page">
      <h2 className="title">Profile</h2>
      <form className="input-form">
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input type="text" name="" id="user-name" readOnly={true} value={student?.sname}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">ID:</label>
          <input type="text" name="" id="user-name" readOnly={true} value={student?.sid}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Scholarship Discount %:</label>
          <input type="text" name="" id="user-name" readOnly={true} value={student?.scholarship_discount}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Major:</label>
          <input type="text" name="" id="user-name" readOnly={true} value={student?.major_name}/>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
