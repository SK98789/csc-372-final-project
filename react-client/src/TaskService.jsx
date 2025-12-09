import axios from 'axios';

const COURSES_API_BASE_URL = "https://csc-372-final-project.onrender.com/tasks";

class TaskService {
    /*
  getAllCourses(id) {
    return axios.get(`${COURSES_API_BASE_URL}/${id}`);
  } */

  getTasksByCourse(id){
    return axios.get(`${COURSES_API_BASE_URL}/${id}`);
  }

  createTask(task) {
    return axios.post(COURSES_API_BASE_URL + "/", task);
  }

  deleteTask(id){
    return axios.delete(`${COURSES_API_BASE_URL}/${id}`);
  }

}

export default new TaskService();