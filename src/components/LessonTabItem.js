import React from "react";

export default class LessonTabItem
    extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <li className="nav-item">
                    <div>
                        <a className="nav-link active" href="#">{this.props.lesson.title}
                            <span className="float-right">
                                <button type="button" className="btn btn-sm"
                                        onClick={(event,lessonId = this.props.lesson.id)=>this.props.remove(event,lessonId)}>
                                        <i className="fa fa-times"></i>
                                </button>
                            </span>
                        </a>
                    </div>
                </li>
            )
        }
    }