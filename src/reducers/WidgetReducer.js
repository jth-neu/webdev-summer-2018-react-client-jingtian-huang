export const widgetReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET' :
            return {
                widgets : [
                    ...state.widgets,
                    {id: idAutoIncrement + 1, text: 'New Widget'}
                ]
            };
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