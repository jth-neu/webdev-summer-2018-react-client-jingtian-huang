import React from 'react';
import LessonTabItem from '../components/LessonTabItem';
import LessonServiceClient from '../services/LessonServiceClient';

export default class LessonTabs
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '',
            moduleId : '',
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

    componentWillReceiveProps(newProps){
        if(newProps.moduleId) {
            this.setCourseId(newProps.courseId);
            this.setModuleId(newProps.moduleId);
            this.findAllLessonsForModule(newProps.courseId,newProps.moduleId);
        }
    }
}
