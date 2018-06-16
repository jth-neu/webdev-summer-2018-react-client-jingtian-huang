import * as constants from "../constants/index"

export const widgetReducer = (state= {widgets: []}, action) => {
    switch (action.type) {

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.SELECT_WIDGET_TYPE:
            console.log(action);
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

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
                    {id: state.widgets.length+1,
                        text: 'New Widget',
                    widgetType: 'Paragraph'}
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