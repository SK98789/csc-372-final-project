import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import CourseService from './CourseService';
/**
 * 
 * @param {*} props - should include method 'courseClicked'
 * @returns 
 */
function CourseDisplay(props){
    function deleteCourse(){
        CourseService.deleteCourse(props.courseId);
        props.refresh();
    }
    return(
        <div className='course' >
            <div onClick={props.courseClicked}>
                <h2>{props.courseName}</h2>
            </div>
            <button className='icon-button-secondary' onClick={deleteCourse}>
                <FontAwesomeIcon icon={faTrash} className='icons-small' />
            </button>
        </div>

    );
}

export default CourseDisplay;