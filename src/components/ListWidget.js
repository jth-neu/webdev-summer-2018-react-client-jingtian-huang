import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

const List = ({preview,nameChanged,listTypeChanged,textChanged,widget}) => {
    let listType;
    let inputElem;
    let inputNameElem;
    return (
        <div>
            <div hidden={preview}>
                <div>
                    <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                              value={widget.text}
                              ref={node => inputElem = node} placeholder="Enter one list item per line"/>
                </div>
                <div>
                    <select onChange={()=> listTypeChanged(widget.id, listType.value)}
                            ref={node => listType = node}
                            value={widget.listType}>
                        <option value='UNORDERED_LIST'>Unordered list</option>
                        <option value='ORDERED_LIST'>Ordered list</option>
                    </select>
                </div>
                <div>
                    <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node} placeholder="Widget Name"/>
                </div>
                <h3>Preview</h3>
            </div>
            {widget.listType === 'UNORDERED_LIST' && <UnorderedListConverter text={widget.text}/>}
            {widget.listType === 'ORDERED_LIST' && <OrderedListConverter text={widget.text}/>}
        </div>
    )
};

const OrderedListConverter = ({text}) => {
    let inputArray = text.split("\n");
    return (
        <ol>
            {inputArray.map(line => ( <li key={inputArray.length++}> {line} </li>))}
        </ol>
    );
};

const UnorderedListConverter = ({text}) => {
    let inputArray = text.split("\n");
    return (
        <ul>
            {inputArray.map(line => ( <li key={inputArray.length++}> {line} </li>))}
        </ul>
    );
};

const dispatchToPropsMapper = dispatch => ({
    textChanged : (widgetId, newText)=>
        actions.textChanged(dispatch, widgetId, newText),
    listTypeChanged : (widgetId, newType)=>
        actions.listTypeChanged(dispatch, widgetId, newType),
    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})
const ListContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(List);

export default ListContainer;