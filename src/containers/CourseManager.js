import React from 'react';
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';

export default class CourseManager
    extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <ModuleList/>
                <CourseCard/>
            </div>
        )
    }
}
