import * as constants from "../constants/index"

const APP_URL_HEROKU = 'https://webdev-summer2018-jthuang.herokuapp.com';
const APP_URL_LOCAL = 'http://localhost:8080';

export const findAllWidgets = dispatch => {
    fetch(APP_URL_HEROKU + '/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
};

export const findAllWidgetsForLesson = (dispatch,lessonId) => {
    fetch(APP_URL_HEROKU+ '/api/lesson/'+lessonId+"/widget")
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
            widgets: widgets }))
}

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);


export const save = (dispatch,lessonId) => (
    dispatch({
        type: constants.SAVE,
        lessonId: lessonId })
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

export const linkChanged = (dispatch, widgetId, newLink) => (
    dispatch({
        type: constants.LINK_CHANGED,
        id: widgetId,
        href: newLink})
);

export const listTypeChanged = (dispatch, widgetId, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType})
);

export const listItemChanged = (dispatch, widgetId, newListItem) => (
    dispatch({
        type: constants.LIST_ITEM_CHANGED,
        id: widgetId,
        listItem: newListItem})
);