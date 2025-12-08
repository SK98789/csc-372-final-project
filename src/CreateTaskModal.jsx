import './App.css'
import React from 'react';
import TaskService from './TaskService';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faTrash } from '@fortawesome/free-solid-svg-icons'
import SubTaskService from './SubTaskService';

Modal.setAppElement('#root');
function CreateTaskModal(props) {
    const [subTasks, setSubTasks] = useState([]);
    const [subTaskInc, setSubTaskInc] = useState(0);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState(new Date().toISOString().slice(0, -8));
    const [taskType, setTaskType] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    async function handleFormSubmission() {
        const courseId = props.course.id;
        const taskParams = { taskTitle, courseId, taskDate, taskType, taskDesc };
        let newTaskId = await TaskService.createTask(taskParams);
        const task_id = newTaskId.data.id;
        subTasks.forEach(async subTask => {
            let sub_task_name = subTask.name;
            let subTaskParams = { sub_task_name, task_id };
            await SubTaskService.createSubTask(subTaskParams);
        });

        closeModal();
        props.refresh();
    }

    function closeModal() {
        props.setIsOpen(false);
        resetIncrementer();
        setSubTasks([]);
        setTaskTitle("");
        setTaskDate("");
        setTaskType("");
        setTaskDesc("");
    }

    function useIncrementer() {
        let value = subTaskInc;
        setSubTaskInc(subTaskInc + 1);
        return value;

    }
    function resetIncrementer() {
        setSubTaskInc(0);
    }

    function addSubTask() {
        subTasks.push({ indexValue: useIncrementer(), name: '' });
        setSubTasks(subTasks);

    }
    function removeSubTask(indexProperty) {
        let newSubTasks = [];
        for (let i = 0; i < subTasks.length; i++) {
            if (subTasks[i].indexValue !== indexProperty) {
                newSubTasks.push(subTasks[i]);
            }
        }
        setSubTasks(newSubTasks);
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >
            <div className='space-between'>
                <h2>Add a New Task</h2>
                <button className='icon-button-secondary' onClick={closeModal}>
                    <FontAwesomeIcon icon={faX} />
                </button>
            </div>
            <div>
                <form action={handleFormSubmission}>
                    <div className='columns'>
                        <input type='text' name='title' placeholder='Task Title' id='form-title' value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)} required />
                        <div className='space-between'>
                            <label>
                                Date:
                                <input type='datetime-local' value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)} required></input>
                            </label>
                            <label>
                                Type:
                                <input type='text' value={taskType}
                                    onChange={(e) => setTaskType(e.target.value)} required></input>
                            </label>
                        </div>
                        <label className='columns'>
                            Description (optional):
                            <textarea value={taskDesc}
                                onChange={(e) => setTaskDesc(e.target.value)} required>

                            </textarea>
                        </label>
                        <h3>Sub-Tasks</h3>
                        {subTasks.map(subTask => (
                            <div key={subTask.indexValue} className='row-padding'>
                                <input type='checkbox' />
                                <input type='text' value={subTask.name}
                                    onChange={(e) => { subTask.name = e.target.value; setSubTasks(subTasks); }} required />
                                <button type='button' className='icon-button-secondary' onClick={() => { removeSubTask(subTask.indexValue) }}>
                                    <FontAwesomeIcon icon={faTrash} className='icons-small' />
                                </button>
                            </div>
                        ))}
                        <button type='button' className='button-class' onClick={addSubTask}>Add Sub-Task</button>
                        <button type='submit' className='button-class'>Create Task</button>
                    </div>
                </form>

            </div>
        </Modal>

    );
}
export default CreateTaskModal;