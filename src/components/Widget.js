import React from "react";
import {connect} from 'react-redux'
const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <li>
            {widget.text}{widget.widgetType}
            <select
                value = {widget.widgetType}
                onChange={e=> dispatch({
                    type: 'SELECT_WIDGET_TYPE',
                    id: widget.id,
                    widgetType: selectElement.value})}
                ref={node => selectElement = node }>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>List</option>
                <option>Link</option>
                <option>Image</option>
            </select>
            <button onClick={e => (
                dispatch({type: 'DELETE_WIDGET', id: widget.id})
            )} >Delete</button>
        </li>
    )
};

const WidgetContainer = connect()(Widget);

export default WidgetContainer;