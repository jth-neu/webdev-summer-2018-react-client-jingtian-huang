import React from 'react';
import LessonTabItem from '../components/LessonTabItem';

export default class LessonTabs
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '',
            moduleId : '',
            lesson : {title: 'New Lesson'},
            lessons : [
                {title: 'Lesson 1', id: 123},
                {title: 'Lesson 2', id: 234},
                {title: 'Lesson 3', id: 345},
                {title: 'Lesson 4', id: 456}
            ]
        };
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
}
