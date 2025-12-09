import './App.css'
import Login from './auth/LoginPage.jsx';
import Home from './HomePage'
import { Link } from 'react-router-dom';
import ProtectedLayout from './auth/ProtectedLayout.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './CalendarPage.jsx';
import Course from './CoursePage.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarDays, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Profile from './auth/ProfilePage.jsx';


function App() {
  return (
    <Router>
      <div className="banner">
        <h1>EduPlanner</h1>
        <div>
          <Link to='/calendar'>
            <button className='icon-button'>
              <FontAwesomeIcon icon={faCalendarDays} className='icons' />
            </button>
          </Link>
          <Link to="/home">
            <button className='icon-button'>
              <FontAwesomeIcon icon={faHouse} className='icons' />
            </button>
          </Link>
          <Link to="/profile">
            <button className='icon-button'>
              <FontAwesomeIcon icon={faCircleUser} className='icons' />
            </button>
          </Link>
        </div>
      </div>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/course" element={<Course />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </Router>


  );

}

export default App
