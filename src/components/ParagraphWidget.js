import React from  'react';
import {connect} from 'react-redux';
import * as actions from "../actions";


const Paragraph = ({widget, preview, textChanged,nameChanged}) => {
    let inputNameElem;
    let inputElem;
    return(
        <div>
            <div hidden={preview}>
                <div>
                    <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                    value={widget.text}
                    ref={node => inputElem = node} placeholder="Paragraph Text"/>
                </div>
                <div>
                    <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node} placeholder="Widget Name"/>
                </div>
                <h3>Preview</h3>

            </div >
            <div>
                <p>{widget.text}</p>
            </div>
        </div>
    )
}
const dispatchToPropsMapper = dispatch => ({
    textChanged: (widgetId, newText) =>
        actions.textChanged(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName),

})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)
export default ParagraphContainer;