import React from 'react';
import LessonTabItem from '../components/LessonTabItem';
import LessonServiceClient from '../services/LessonServiceClient';
import WidgetListContainer from "../containers/WidgetList"

export default class LessonTabs
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '',
            moduleId : '',
            lesson : {title: ''},
            lessons : [],
            lessonId : '',
            selectedItem: null
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.lessonService = LessonServiceClient.instance;
    }
    render() { return(
        <div>
            <div>
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
            <div>
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}
                </ul>
            </div>
            <div>
                <WidgetListContainer/>
            </div>
        </div>
    );}

    renderListOfLessons() {
        let lessons = this.state.lessons
            .map(function(lesson, idx){
             var is_selected = this.state.selectedItem == idx;
             return (<LessonTabItem title={lesson.title}
                           key={lesson.id}
                           lesson={lesson}
                           remove={this.deleteLesson.bind(this)}
                           onClick={this.clickHandler.bind(this, idx)}
                           isSelected={is_selected}/>)},
                 this)

        return lessons;
    }

    clickHandler(idx) {
        this.setState({selectedItem: idx});
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
        if(this.state.lesson.title === ''){
            lesson= {title:"New Lesson"};
        } else{
            lesson = this.state.lesson;
        }
        this.lessonService
            .createLesson(this.state.courseId,this.state.moduleId,lesson)
            .then(()=>this.findAllLessonsForModule(this.state.courseId,this.state.moduleId));
    }

    deleteLesson(event,lessonId) {
        const confirmation = window.confirm("Are you sure to delete this lesson?");
        if(confirmation) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(()=>this.findAllLessonsForModule(this.state.courseId,this.state.moduleId));
        }
    }
}
