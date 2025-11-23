import './CourseDisplay.css'
/**
 * 
 * @param {*} props - should include method 'courseClicked'
 * @returns 
 */
function CourseDisplay(props){
    return(
        <div className='course' onClick={props.courseClicked} >
            <h2>{props.courseName}</h2>
        </div>

    );
}

export default CourseDisplay;