import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h2 className="title">Profile</h2>
      <form className="input-form">
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input type="text" name="" id="user-name" readOnly={true} value="Châu An Phú"/>
        </div>
        <div className="form-group">
          <label htmlFor="username">ID:</label>
          <input type="text" name="" id="user-name" readOnly={true} value="ITDSIU22158"/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input type="text" name="" id="user-name" readOnly={true} value="ITDSIU22158@student.hcmiu.edu.vn"/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Major:</label>
          <input type="text" name="" id="user-name" readOnly={true} value="Data Science"/>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
