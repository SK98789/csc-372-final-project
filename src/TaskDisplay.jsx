import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import TaskService from './TaskService';
/**
 * 
 * @param {*} props - should include method 'courseClicked'
 * @returns 
 */
function TaskDisplay(props) {

    async function deleteTask(){
        TaskService.deleteTask(props.task.id);
        props.refreshTasks();
    }

    return (
        <>
            <div className='task-rows' onClick={props.onClicked} >
                <div id='name-type-task' className='row-padding baseline'>
                    <h2>{props.task.task_name}</h2>
                    <h3>({props.task.task_type})</h3>
                    <p id='description'>{props.task.description}</p>
                </div>

                <button className='icon-button-secondary' onClick={deleteTask}>
                    <FontAwesomeIcon icon={faTrash} className='icons-small' />
                </button>
            </div>

        </>

    );
}

export default TaskDisplay;