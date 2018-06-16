import React from  'react';
import {connect} from 'react-redux';
import * as actions from "../actions";


const Image = ({widget, preview, srcChanged,nameChanged}) => {
    let inputNameElem;
    let inputElem;
    return(
        <div>
            <div hidden={preview}>
                <div>
                    <input onChange={() => srcChanged(widget.id, inputElem.value)}
                              value={widget.src}
                              ref={node => inputElem = node} placeholder="Image URL"/>
                </div>
                <div>
                    <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node} placeholder="Widget Name"/>
                </div>
                <h3>Preview</h3>

            </div >
            <div>
                <img src={widget.src} />
            </div>
        </div>
    )
}
const dispatchToPropsMapper = dispatch => ({
    srcChanged: (widgetId, newText) =>
        actions.srcChanged(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName),

})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)
export default ImageContainer;