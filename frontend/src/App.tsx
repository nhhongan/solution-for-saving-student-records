import './assets/css/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import CourseRegisPage from './pages/CourseRegisPage/CourseRegisPage';
import LoginPage from 'pages/Login/LoginPage';
import RootLayout from 'layouts/RootLayout';
import Footer from 'layouts/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout/>}>
            <Route index element={<HomePage />}/>
            <Route path='/course-registration' element={<CourseRegisPage />}/>
          </Route>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
