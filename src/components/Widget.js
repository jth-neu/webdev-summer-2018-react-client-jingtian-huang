import React from "react";
import {connect} from 'react-redux'
import HeadingContainer from './HeadingWidget'
import ParagraphContainer from "./ParagraphWidget";
import ImageContainer from "./ImageWidget";
import LinkContainer from "./LinkWidget";
import ListContainer from "./ListWidget";
import * as constants from "../constants";

const Widget = ({widget, dispatch,preview}) => {
    let selectElement;
    return (
        <li>
            <div className='row' hidden={preview}>
                <div className="col-8">
                    <h2>{widget.widgetType} Widget</h2>
                </div>
                <div className="col-4">
                    <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button className='btn btn-warning'
                                    onClick={e=> dispatch({
                                        type: constants.MOVE_WIDGET_UP,
                                        widgetOrder: widget.widgetOrder
                                    })}
                            ><i className="fa fa-arrow-circle-up fa-lg "/></button>
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <button className='btn btn-warning'
                                    onClick={e=> dispatch({
                                        type: constants.MOVE_WIDGET_DOWN,
                                        widgetOrder: widget.widgetOrder
                                    })}><i className="fa fa-arrow-circle-down fa-lg "/></button>
                        </div>
                        <div className="input-group" role="group" aria-label="Third group">
                            <select
                                className="form-control-sm"
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
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <button className='btn btn-danger' onClick={e => (
                                dispatch({type: 'DELETE_WIDGET', id: widget.id})
                            )} ><i className="fa fa-times"/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {widget.widgetType==='Heading' &&  <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
            </div>
            <hr></hr>
        </li>
    )
};


const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget);

export default WidgetContainer;