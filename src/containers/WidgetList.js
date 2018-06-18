import React, {Component} from 'react'
import {connect} from 'react-redux'
import WidgetContainer from '../components/Widget'
import * as actions from "../actions";

class WidgetList extends Component {
    constructor(props) {
        super(props);
        // this.props.findAllWidgets()
    }

    componentWillReceiveProps(newProps) {
        if(this.props.lessonId !== newProps.lessonId){
            this.props.findAllWidgetsForLesson(newProps.lessonId);
        }
    }

    render() {
        return(
            <div className="container" hidden={this.props.lessonId === ''}>
                <h1>lessonID: {this.props.lessonId}</h1>
                <div className="row float-right" >
                    <button className='btn btn-success' hidden={this.props.previewMode} onClick={this.props.save}>Save</button>
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
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})

const WidgetListContainer = connect(
    stateToPropertiesMapper,dispatchToPropsMapper)(WidgetList)

export default WidgetListContainer;