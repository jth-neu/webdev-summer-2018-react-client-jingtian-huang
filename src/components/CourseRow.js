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
                        <Link to={`/course/${this.props.course.id}/edit`}>
                            {this.props.course.title}
                        </Link>
                    </td>
                    <td>
                        {this.props.course.owner}
                    </td>
                    <td>
                        {this.timeDisplay(this.props.course.modified)}
                    </td>
                    <td>

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