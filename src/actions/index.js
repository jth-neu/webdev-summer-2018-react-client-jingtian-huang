import * as constants from "../constants/index"

export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);


export const save = dispatch => (
    dispatch({type: constants.SAVE})
);

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
);

export const textChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.TEXT_CHANGED,
        id: widgetId,
        text: newText})
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);

export const nameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        name: newName})
);

export const srcChanged = (dispatch, widgetId, newSrc) => (
    dispatch({
        type: constants.SRC_CHANGED,
        id: widgetId,
        src: newSrc})
);