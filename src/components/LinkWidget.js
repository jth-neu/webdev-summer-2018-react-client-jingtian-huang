import React from  'react';
import {connect} from 'react-redux';
import * as actions from "../actions";


const Link = ({widget, preview,textChanged ,linkChanged,nameChanged}) => {
    let inputNameElem;
    let inputTextElem;
    let inputLinkElem;
    return(
        <div>
            <div hidden={preview}>
                <div>
                    <input className="form-control" onChange={()=> textChanged(widget.id, inputTextElem.value)}
                           ref={node => inputTextElem = node}
                           value={widget.text}
                           placeholder="Link Text"/>
                </div>
                <div>
                    <input className="form-control" onChange={() => linkChanged(widget.id, inputLinkElem.value)}
                           value={widget.href}
                           ref={node => inputLinkElem = node} placeholder="Link URL"/>
                </div>
                <div>
                    <input className="form-control" onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node} placeholder="Widget Name"/>
                </div>
                <h3>Preview</h3>

            </div >
            <div>
                <a href={widget.href}> {widget.text} </a>
            </div>
        </div>
    )
}
const dispatchToPropsMapper = dispatch => ({
    linkChanged: (widgetId, newLink) =>
        actions.linkChanged(dispatch, widgetId, newLink),
    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName),
    textChanged : (widgetId, newText)=>
        actions.textChanged(dispatch, widgetId, newText)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);
export default LinkContainer;