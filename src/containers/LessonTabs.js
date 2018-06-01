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

        this.titleChanged = this.titleChanged.bind(this);

        this.lessonService = LessonServiceClient.instance;
    }
    render() { return(
        <div className="row">
            <div className="col-8">
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}
                </ul>
            </div>
            <div className="col-4">
                <div className="input-group mb-3">
                    <input onChange={this.titleChanged}  placeholder="Enter the lesson title" type="text"
                           className="form-control" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button onClick={this.createLesson} className="btn btn-primary btn-block">
                            <i className="fa fa-plus "></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
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

    titleChanged(event) {
        this.setState({module: {title: event.target.value}})
    }
}
