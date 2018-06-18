import React, {Component} from 'react'
import {connect} from 'react-redux'
import WidgetContainer from '../components/Widget'
import * as actions from "../actions";

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.state = {lessonId: ''};
        this.saveWidgetsToLesson = this.saveWidgetsToLesson.bind(this);
    }

    componentDidMount() {
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.lessonId !== newProps.lessonId){
            this.props.findAllWidgetsForLesson(newProps.lessonId);
        }
        this.setLessonId(newProps.lessonId)
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    saveWidgetsToLesson() {
        console.log(this.state.lessonId)
        this.props.save(this.state.lessonId)
    }

    render() {
        return(
            <div className="container" hidden={this.props.lessonId === ''}>
                <h1>lessonID: {this.props.lessonId}</h1>
                <div className="row float-right" >
                    <button className='btn btn-success' hidden={this.props.previewMode} onClick={this.saveWidgetsToLesson}>Save</button>
                    <button className='btn btn-outline-primary' onClick={this.props.preview }>Preview</button>
                </div>
                <br/>
                <br/>
                <div>
                    <ul>
                        <div>
                        {this.props.widgets.map(widget => (
                            <WidgetContainer className="row" widget={widget}
                                             preview={this.props.previewMode}
                                             key={widget.id}/>
                        ))}
                        </div>
                    </ul>
                </div>
                <button className='float-right btn btn-danger' onClick={this.props.addWidget}><i className="fa fa-plus"/></button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

const dispatchToPropsMapper = dispatch => ({
    findAllWidgets : () => actions.findAllWidgets(dispatch),
    findAllWidgetsForLesson : (lessonId)=> actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch,lessonId),
    preview: () => actions.preview(dispatch)
})

const WidgetListContainer = connect(
    stateToPropertiesMapper,dispatchToPropsMapper)(WidgetList)

export default WidgetListContainer;