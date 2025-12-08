import './App.css'
import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import TaskService from './TaskService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'
import CreateTaskModal from './CreateTaskModal';
import { useLocation } from 'react-router-dom';
import TaskDisplay from './TaskDisplay';

Modal.setAppElement('#root');
function Course(props) {
    let location = useLocation();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (location.state === null) {
            navigate('/');
        }
        else {
            getTasks();

        }

    }, []);

    function getTasks() {
        let id = location.state.course.id;
        TaskService.getTasksByCourse(id).then((res) => {
            setTasks(res.data);
        });

    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="space-between">
                <h1>Tasks for {location.state.course.course_name}</h1>
                <button className="button-class" onClick={openModal}>Add Task</button>
            </div>
            <hr />
            <div>
                {tasks.map(task => (
                    <TaskDisplay task={task} onClicked={() => { }} key={task.id} refreshTasks={getTasks} />

                ))}
            </div>
            <div>
                <CreateTaskModal
                    refresh={getTasks}
                    course={location.state.course}
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
        </>
    );
}
export default Course;