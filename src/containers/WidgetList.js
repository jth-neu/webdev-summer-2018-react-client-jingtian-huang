import React, {Component} from 'react'
import {connect} from 'react-redux'
import WidgetContainer from '../components/Widget'
import {findAllWidgets} from "../actions";

class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    render() {
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={e => (
                    this.props.dispatch({type: 'ADD_WIDGET'})
                )}>Add Widget</button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
})

const dispatchToPropsMapper = dispatch => ({
    findAllWidgets : () => findAllWidgets(dispatch)
})

const WidgetListContainer = connect(
    stateToPropertiesMapper,dispatchToPropsMapper)(WidgetList)

export default WidgetListContainer;