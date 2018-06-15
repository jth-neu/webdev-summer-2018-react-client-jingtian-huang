import * as constants from "../constants/index"

export const widgetReducer = (state= {widgets: []}, action) => {
    switch (action.type) {

        case constants.SAVE:
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            })
            return state;

        case constants.FIND_ALL_WIDGETS :
            return {
                widgets: action.widgets
            };

        case 'ADD_WIDGET' :
            return {
                widgets : [
                    ...state.widgets,
                    {id: state.widgets.length+1, text: 'New Widget'}
                ]
            };

        case 'DELETE_WIDGET' :
            return {
                widgets: state.widgets.filter(widget => (
                 widget.id !== action.id
            )) };

        default:
            return state
    }

};