import CourseDisplay from "./CourseDisplay";
import CourseService from "./CourseService";
import { useAuth } from './auth/AuthContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import './App.css'
function Home() {
    const [course_name, setName] = useState('');
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    let user_google_id = user.googleid;

    useEffect(() => {
        user_google_id = user.googleid;
        refresh();
    }, []);

    function getInspiration(){
        CourseService.getExternalAPIQuote().then((res) => {
            let value = res.data;
            let quote = `"${value.quoteText}" \n - ${value.quoteAuthor}`;
            alert(quote);
        });
    }

    function refresh(){
         CourseService.getAllCourses(user_google_id).then((res) => {
                setCourses(res.data);
                document.title = 'Courses List';
            });
    }

    function createNewCourse() {

        const params = { user_google_id, course_name };
        CourseService.createCourse(params).then(() => {
            refresh();
        });
    }

    return (
        <>
            <div className="space-between">
                <h1>Classes</h1>
                <div>
                    <form action={createNewCourse} className="row-padding">
                        <input id="class-input-bar" type="text" onChange={(e) => setName(e.target.value)} required></input>
                        <input type="submit" value="Add Class" className="button-class" />
                        <button type="button" className="button-class" onClick={getInspiration}>Get Inspiration</button>
                    </form>
                </div>
            </div>
            <hr/>
            {courses.map(course => (
                <CourseDisplay refresh={refresh} courseId={course.id} courseName={course.course_name} key={course.id} courseClicked={() => {navigate('/course', {state: {course}}  ); }} />

            ))}
        </>
    );
}
export default Home;