import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import TaskService from './TaskService';
/**
 * 
 * @param {*} props - should include method 'courseClicked'
 * @returns 
 */
function TaskDisplay(props) {

    async function deleteTask() {
        TaskService.deleteTask(props.task.id);
        props.refreshTasks();
    }
    async function handleTaskSwitch() {
        if (props.task.still_active) {
            changeTaskIsActive(false);
        } else {
            changeTaskIsActive(true);
        }
    }

    async function changeTaskIsActive(isStillActive) {
        TaskService.updateTaskIsActive(props.task.id, isStillActive);
    }

    return (
        <>
            <div className='task-rows' onClick={props.onClicked} >
                <div id='name-type-task' className='row-padding baseline'>
                    <h2>{props.task.task_name}</h2>
                    <h3>({props.task.task_type})</h3>
                    <p id='description'>{props.task.description}</p>
                </div>
                <button className='icon-button-secondary' onClick={handleTaskSwitch}>
                    <FontAwesomeIcon icon={() => {
                        if (props.task.still_active) {
                            return faCircle;
                        }
                        else { return faCircleCheck }
                    }} className='icons-small' />
                </button>
                <button className='icon-button-secondary' onClick={deleteTask}>
                    <FontAwesomeIcon icon={faTrash} className='icons-small' />
                </button>
            </div>

        </>

    );
}

export default TaskDisplay;