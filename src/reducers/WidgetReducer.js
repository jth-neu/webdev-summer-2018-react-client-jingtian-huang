import * as constants from "../constants/index"

export const widgetReducer = (state= {widgets: []}, action) => {
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS :
            return {
                widgets: action.widgets
            }
        case 'ADD_WIDGET' :
            return {
                widgets : [
                    ...state.widgets,
                    {id: idAutoIncrement++, text: 'New Widget'}
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

let idAutoIncrement = 4;


let initialState = {
    widgets : [
        {id:0 , text:"Widget 1"},
        {id:1 , text:"Widget 2"},
        {id:2 , text:"Widget 3"},
        {id:3 , text:"Widget 4"}
    ]
}