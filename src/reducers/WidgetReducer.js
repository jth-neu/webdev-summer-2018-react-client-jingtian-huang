import * as constants from "../constants/index"

export const widgetReducer = (state= {widgets: [], preview:false}, action) => {
    switch (action.type) {

        case constants.MOVE_WIDGET_UP:
            newState = Object.assign({}, state);
            newState.widgets = moveWidgetUp(action.id, action.widgetOrder, newState.widgets);
            newState.widgets.sort(orderComparator)
            return JSON.parse(JSON.stringify(newState));

        case constants.MOVE_WIDGET_DOWN:
            newState = Object.assign({}, state);
            newState.widgets = moveWidgetDown(action.id, action.widgetOrder, newState.widgets);
            newState.widgets.sort(orderComparator)
            return JSON.parse(JSON.stringify(newState));

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

        case constants.LIST_ITEM_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listItem = action.listItem
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
            fetch('http://localhost:8080/api/lesson/'+ action.lessonId +'/widgets', {
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

        case constants.FIND_ALL_WIDGETS_FOR_LESSON:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState

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
                    listType:'unordered',
                    listItem:'',
                    widgetOrder: state.widgets.length + 1}
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

const moveWidgetUp = (widgetId, oldOrder, widgets) => {
    return widgets.map((widget) => {
            let newWidget = Object.assign({}, widget);
            if(widget.widgetOrder === oldOrder) {
                newWidget.widgetOrder = widget.widgetOrder - 1;
                return newWidget;
            }

            if(widget.widgetOrder === (oldOrder - 1)) {
                newWidget.widgetOrder = widget.widgetOrder + 1;
            }
            return newWidget;
        }
    );
};

const moveWidgetDown = (widgetId, oldOrder, widgets) => {
    return widgets.map((widget) => {
            let newWidget = Object.assign({}, widget);
            if(widget.widgetOrder === oldOrder) {
                newWidget.widgetOrder = widget.widgetOrder + 1;
                return newWidget;
            }

            if(widget.widgetOrder === (oldOrder + 1)) {
                newWidget.widgetOrder = widget.widgetOrder - 1;
            }
            return newWidget;
        }
    );
};

const orderComparator = (a, b) => {
    {return (a.widgetOrder > b.widgetOrder) ? 1 : ((b.widgetOrder > a.widgetOrder) ? -1 : 0);}
};