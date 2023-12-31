import axios, { AxiosResponse } from "axios";
import Class from "models/Class";
import CourseProgram from "models/CourseProgram";
import { Exam } from "models/Exam";
import Fee from "models/Fee";
import Mark from "models/Mark";
import Student from "models/Student";

// Post with form data as body

export type LoginResponse = {
    token: string;
    };
export const logIn = async (url: string, username: string, password: string) => {
  if (username === "" || password === "") {
    throw new Error("Username or password is empty");
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const response = await axios.postForm(
    process.env.REACT_APP_API_ENDPOINT + url, 
    formData);
  return response;
}

export const getMajorProgram = async (sid: string): Promise<AxiosResponse<CourseProgram[]>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/major-program/${sid}`);
  return response;
}

export const getTimeTable = async (sid: string, semester: string, week?: number): Promise<AxiosResponse<Class[]>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/timetable/${sid}?semester=${semester}`);
  return response;
}

export const getClass = async(cid: string): Promise<AxiosResponse<Class[]>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/course-registration/${cid}`);
  return response;
}

export const getFee = async(sid: string, semester: string): Promise<AxiosResponse<Fee>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/tuition-fee/${sid}?semester=${semester}`);
  return response;
}

export const getStudentInfo = async(sid: string): Promise<AxiosResponse<Student>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/student/${sid}`);
  return response;
}

export const getExamSchedule = async(sid: string): Promise<AxiosResponse<Exam[]>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/exam-schedule/${sid}`);
  return response;
}

export const getStudentMarks = async(sid: string): Promise<AxiosResponse<Mark[]>> => {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/student-mark/${sid}`);
  return response;
}

export const patchRegisteredClass = async(sid: string, cids: string[]): Promise<AxiosResponse<any>> => {
  const response = await axios.patch(process.env.REACT_APP_API_ENDPOINT + `/course-registration/${sid}/enroll_courses`, cids);
  return response;
}