import React from "react";

export default class LessonTabItem
    extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <li className="nav-item">
                    <a className="nav-link active" href="#">{this.props.lesson.title}</a>
                </li>
            )
        }
    }