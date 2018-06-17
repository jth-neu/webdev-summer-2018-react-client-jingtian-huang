import * as constants from "../constants/index"

export const widgetReducer = (state= {widgets: [], preview:false}, action) => {
    switch (action.type) {

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            };

        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LINK_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            });
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
                    text: '',
                    widgetType: 'Paragraph',
                    size: '2',
                    name: '',
                    src: '',
                    href:'',
                    listType:'UNORDERED_LIST'}
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