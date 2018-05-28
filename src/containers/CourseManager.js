import React from 'react'
import CourseCard from './CourseCard'

export default class CourseManager
    extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseCard/>
            </div>
        )
    }
}
