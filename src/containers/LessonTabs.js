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
            lesson : {title: ''},
            lessons : []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
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
                    <input onChange={this.titleChanged} value={this.state.lesson.title}
                           placeholder="Enter New Lesson Title" type="text"
                           className="form-control"/>
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
        console.log(event.target.value);
        this.setState({lesson: {title: event.target.value}})
    }

    createLesson() {
        let lesson ;
        if(this.state.lesson.title==''){
            lesson= {title:"New Lesson"};
        } else{
            lesson = this.state.lesson;
        }
        this.lessonService
            .createLesson(this.state.courseId,this.state.moduleId,lesson)
            .then(()=>this.findAllLessonsForModule(this.state.courseId,this.state.moduleId));
    }
}
