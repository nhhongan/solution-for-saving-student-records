import './assets/css/App.scss';
import {BrowserRouter, Route, Routes, Navigate, useLocation, Outlet} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import CourseRegisPage from './pages/CourseRegisPage/CourseRegisPage';
import TimeTablePage from 'pages/TimeTablePage/TimeTablePage';
import LoginPage from 'pages/Login/LoginPage';
import ExamSchedulePage from 'pages/ExamSchedulePage/ExamSchedulePage';

import RootLayout from 'layouts/RootLayout';
import Footer from 'layouts/Footer/Footer';
import FeePage from 'pages/FeePage/FeePage';
import CourseProgramPage from 'pages/CourseProgramPage/CourseProgramPage';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated
    ? <RootLayout/>
    : <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute/>}>
            <Route index element={<HomePage />}/>
            <Route path='/course-registration' element={<CourseRegisPage />}/>
            <Route path='/timetable' element={<TimeTablePage />}/>
            <Route path='/examination-schedule' element={<ExamSchedulePage />}/>
            <Route path='/school-fee' element={<FeePage />}/>
            <Route path='/course-program' element={<CourseProgramPage />}/>
          </Route>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
