import React from "react";
import {connect} from 'react-redux'
import * as actions from "../actions";

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
                {widget.widgetType==='Heading' &&  <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <Paragraph/>}
                {widget.widgetType==='List' && <List/>}
                {widget.widgetType==='Link' && <Link/>}
                {widget.widgetType==='Image' && <Image/>}
            </div>
        </li>
    )
};

const Heading = ({headingSizeChanged,widget}) => {
    let selectHeadingSize;
    return (
        <div>
        <div>
            <h2>Heading {widget.size} </h2>
            <select onChange={()=> headingSizeChanged(widget.id, selectHeadingSize.value)}
                    ref={node => selectHeadingSize = node}>
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
            </select>
            <h3>Preview</h3>
        </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    headingSizeChanged : (widgetId, newSize)=>
    actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const HeadingContainer = connect(null,dispatchToPropsMapper)(Heading)

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