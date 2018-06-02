import React from 'react';
import { Link } from 'react-router-dom';

class CourseRow extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
                <tr>
                    <td>
                        <div>
                            <i className="fa fa-book">&ensp;</i>
                            <Link to={`/course/${this.props.course.id}/edit`}>
                                {this.props.course.title}
                            </Link>
                        </div>
                    </td>
                    <td>
                        {this.props.course.owner}
                    </td>
                    <td>
                        {this.timeDisplay(this.props.course.modified)}
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger"
                        onClick={(event,courseId = this.props.course.id)=>this.props.delete(event, courseId)}>
                            <span className="fa fa-times"></span>
                        </button>
                    </td>
                </tr>
        )
    }

    timeDisplay(time) {
        if(time) {
            return time.substring(0,time.indexOf("T"));
        } else {
            return time;
        }
    }
}
export default CourseRow;