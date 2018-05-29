import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './hello';
import CourseManager from './containers/CourseManager'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import ModuleList from "./containers/ModuleList"

ReactDOM.render(
    <div className="container-fluid">
        <ModuleList/>
        <CourseManager/>
    </div>,
    document.getElementById('root')
);