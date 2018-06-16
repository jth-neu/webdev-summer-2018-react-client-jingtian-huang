import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

const Heading = ({preview,nameChanged,headingSizeChanged,headingTextChanged,widget}) => {
    let selectHeadingSize;
    let headingTextInput;
    let inputNameElem;
    return (
        <div>
            <div hidden={preview}>
                <input onChange={()=> headingTextChanged(widget.id, headingTextInput.value)}
                       ref={node => headingTextInput = node}
                       value={widget.text}/>
                <select onChange={()=> headingSizeChanged(widget.id, selectHeadingSize.value)}
                        ref={node => selectHeadingSize = node}
                        value={widget.size}>
                    <option value='1'>Heading 1</option>
                    <option value='2'>Heading 2</option>
                    <option value='3'>Heading 3</option>
                </select>
                <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                       value={widget.name}
                       ref={node => inputNameElem = node} placeholder="Widget Name"/>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged : (widgetId, newText)=>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged : (widgetId, newSize)=>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Heading);

export default HeadingContainer;