import axios from 'axios';

const COURSES_API_BASE_URL = "https://csc-372-final-project.onrender.com/subtasks";

class SubTaskService {
    /*
  getAllCourses(id) {
    return axios.get(`${COURSES_API_BASE_URL}/${id}`);
  } */

  getSubTasksByCourse(id){
    return axios.get(`${COURSES_API_BASE_URL}/${id}`);
  }

  createSubTask(subtask) {
    return axios.post(COURSES_API_BASE_URL + "/", subtask);
  }
}

export default new SubTaskService();