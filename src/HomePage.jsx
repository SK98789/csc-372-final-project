import CourseDisplay from "./CourseDisplay";
import CourseService from "./CourseService";
import { useAuth } from './auth/AuthContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import './HomePage.css'
function Home() {
    const [course_name, setName] = useState('');
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    let user_google_id = user.googleid;

    useEffect(() => {
        user_google_id = user.googleid;
        CourseService.getAllCourses(user_google_id).then((res) => {
            setCourses(res.data);
            document.title = 'Courses List';
        });
    }, []);

    function createNewCourse() {

        const params = { user_google_id, course_name };
        CourseService.createCourse(params).then(() => {
            CourseService.getAllCourses(user_google_id).then((res) => {
                setCourses(res.data);
                document.title = 'Courses List';
            });
        });
    }

    return (
        <>
            <div className="space-between">
                <h1>Classes</h1>
                <div>
                    <form action={createNewCourse}>
                        <input type="text" onChange={(e) => setName(e.target.value)} required></input>
                        <input type="submit" value="Add Class" className="button-class" />
                    </form>
                </div>
            </div>
            {courses.map(course => (
                <CourseDisplay courseName={course.course_name} key={course.id} courseClicked={() => {navigate('/course' ); }} />

            ))}
        </>
    );
}
export default Home;