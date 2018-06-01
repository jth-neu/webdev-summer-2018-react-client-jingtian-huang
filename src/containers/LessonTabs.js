import React from 'react';
import LessonTabItem from '../components/LessonTabItem';
import LessonServiceClient from '../services/LessonServiceClient';

export default class LessonTabs
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '2',
            moduleId : '2',
            lesson : {title: 'New Lesson'},
            lessons : []
        };

        this.lessonService = LessonServiceClient.instance;
    }
    render() { return(
        <ul className="nav nav-tabs">
            {this.renderListOfLessons()}
        </ul>
    );}

    renderListOfLessons() {
        let lessons = this.state.lessons
            .map(lesson =>
            <LessonTabItem title={lesson.title} key={lesson.id}
                           lesson={lesson}/>)
        return lessons;
    }

    findAllLessonsForModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setLessons(lessons) {
        this.setState({lessons:lessons});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        this.findAllLessonsForModule(this.state.courseId,this.state.moduleId)
    }
}
