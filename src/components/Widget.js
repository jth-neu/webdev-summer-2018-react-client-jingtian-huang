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
            <div>
                {widget.widgetType==='Heading' &&  <Heading/>}
                {widget.widgetType==='Paragraph' && <Paragraph/>}
                {widget.widgetType==='List' && <List/>}
                {widget.widgetType==='Link' && <Link/>}
                {widget.widgetType==='Image' && <Image/>}
            </div>
        </li>
    )
};

const Heading = () => (
    <div>
    <h2>Heading</h2>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>
)

const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)
const List = () => (
    <h2>List</h2>
)
const Image = () => (
    <h2>Image</h2>
)
const Link = () => (
    <h2>Link</h2>
)


const WidgetContainer = connect()(Widget);

export default WidgetContainer;