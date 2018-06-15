import React from "react";
import {connect} from 'react-redux'
const Widget = ({widget, dispatch}) => (
    <li>
        {widget.text}
        <button onClick={e => (
            dispatch({type: 'DELETE_WIDGET', id: widget.id})
        )} >Delete</button>
    </li>
)

const WidgetContainer = connect()(Widget)

export default WidgetContainer;