import axios from 'axios';

const COURSES_API_BASE_URL = "http://localhost:3000/courses";

class CoursesService {
  getAllCourses(id) {
    return axios.get(`${COURSES_API_BASE_URL}/${id}`);
  }

  createCourse(course) {
    return axios.post(COURSES_API_BASE_URL + "/", course);
  }
  deleteCourse(id) {
    return axios.delete(`${COURSES_API_BASE_URL}/${id}`);
  }
  getExternalAPIQuote(){
    return axios.get(COURSES_API_BASE_URL + "/getquote");
  }
}

export default new CoursesService();