import React, {Component} from 'react'
import {connect} from 'react-redux'
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props)
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
            </div>
        )
    }
}

export default WidgetList;