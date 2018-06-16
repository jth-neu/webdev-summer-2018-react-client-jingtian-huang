import React from "react";
import {connect} from 'react-redux'
import HeadingContainer from './HeadingWidget'

const Widget = ({widget, dispatch,preview}) => {
    let selectElement;
    return (
        <li>
            <div className='row' hidden={preview}>
                <div className="col-9">
                    <h2>{widget.widgetType} Widget</h2>
                </div>
                <div className="col-3 float-right">
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
                </div>
            </div>
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


const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget);

export default WidgetContainer;