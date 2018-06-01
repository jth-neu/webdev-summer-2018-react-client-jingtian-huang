import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {
            courseId: '',
            moduleId: ''
        };
    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
    }



    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    setModule(event,moduleId) {
        this.setState({moduleId: moduleId});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId} setModule={this.setModule.bind(this)}/>
                    </div>
                    <div className="col-8">
                        <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
                    </div>
                </div>
            </div>
        )
    }
}