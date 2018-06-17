import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

const List = ({preview,nameChanged,listTypeChanged,listItemChanged,widget}) => {
    let listType;
    let inputElem;
    let inputNameElem;
    return (
        <div>
            <div hidden={preview}>
                <div>
                    <textarea onChange={() => listItemChanged(widget.id, inputElem.value)}
                              value={widget.listItem}
                              ref={node => inputElem = node} placeholder="Enter one list item per line"/>
                </div>
                <div>
                    <select onChange={()=> listTypeChanged(widget.id, listType.value)}
                            ref={node => listType = node}
                            value={widget.listType}>
                        <option value="unordered">Unordered list</option>
                        <option value="ordered">Ordered list</option>
                    </select>
                </div>
                <div>
                    <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node} placeholder="Widget Name"/>
                </div>
                <h3>Preview</h3>
            </div>
            {widget.listType === "unordered" && <UnorderedListConverter listItem={widget.listItem}/>}
            {widget.listType === "ordered" && <OrderedListConverter listItem={widget.listItem}/>}
        </div>
    )
};

const OrderedListConverter = ({listItem}) => {
    let inputArray = listItem.split("\n");
    return (
        <ol>
            {inputArray.map(line => ( <li key={inputArray.length++}> {line} </li>))}
        </ol>
    );
};

const UnorderedListConverter = ({listItem}) => {
    let inputArray = listItem.split("\n");
    return (
        <ul>
            {inputArray.map(line => ( <li key={inputArray.length++}> {line} </li>))}
        </ul>
    );
};

const dispatchToPropsMapper = dispatch => ({
    listItemChanged : (widgetId, newListItem)=>
        actions.listItemChanged(dispatch, widgetId, newListItem),
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