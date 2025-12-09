import './App.css'
import React from 'react';
import TaskService from './TaskService';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'

Modal.setAppElement('#root');
function CreateTaskModal(props) {
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

        closeModal();
        props.refresh();
    }

    function closeModal() {
        props.setIsOpen(false);
        setTaskTitle("");
        setTaskDate("");
        setTaskType("");
        setTaskDesc("");
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

                        <button type='submit' className='button-class'>Create Task</button>
                    </div>
                </form>

            </div>
        </Modal>

    );
}
export default CreateTaskModal;