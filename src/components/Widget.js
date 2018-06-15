import React from "react";
import {connect} from 'react-redux'
const Widget = ({widget}) => (
    <li> {widget.text} </li>
)

const WidgetContainer = connect()(Widget)

export default WidgetContainer;