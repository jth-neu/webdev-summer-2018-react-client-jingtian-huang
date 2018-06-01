import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseServiceClient from '../services/CourseServiceClient';

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {
            course: { title: "New Course"},
            courses: []
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        let courses = this.state.courses.map(
            function (course) {
                return <CourseRow key={course.id} course={course}
                delete={this.deleteCourse.bind(this)}/>
            },this
        )
        return (
            courses
        )
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }
    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });
    }

    deleteCourse(event,courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(()=> {this.findAllCourses();});
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th colSpan={3}><input onChange={this.titleChanged} id="titleFld" className="form-control"
                                       placeholder="New Course Title"/></th>
                            <th><button onClick={this.createCourse} className='btn btn-primary'>
                                <span className="fa fa-plus"></span>
                            </button></th>
                        </tr>
                        <tr><th>Title</th><th>Owned By</th><th>Last Modified</th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;
