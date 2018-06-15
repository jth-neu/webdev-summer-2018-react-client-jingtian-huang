import React from "react";
import Widget from "./Widget"

export default class LessonTabItem
    extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            var liStyle = {
                background: '#eee'
            };
            if (this.props.isSelected) {
                liStyle['background'] = '#ff7f7f';
            }
            return (
                <li className="nav-item"
                    onClick={(event)=>this.props.onClick(event)}>
                    <div>
                        <a className="nav-link active" href="#" style={liStyle}>{this.props.lesson.title}
                            <span className="float-right">
                                &nbsp;
                                <i className="fa fa-times"
                                   onClick={(event,lessonId = this.props.lesson.id)=>this.props.remove(event,lessonId)}></i>
                            </span>
                        </a>
                    </div>
                    <div hidden={!this.props.isSelected}>
                        <Widget/>
                    </div>
                </li>
            )
        }
    }