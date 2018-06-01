import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';

export default class ModuleList
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '',
            module: {title:'New Module'},
            modules: []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);

        this.moduleService = ModuleServiceClient.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        console.log(this.state.module);
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => {this.findAllModulesForCourse(this.props.courseId)})
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}})
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    renderListOfModules() {
        let modules = this.state.modules
            .map(function(module){
                return <ModuleListItem
                    title={module.title} key={module.id}
                    module={module}
                    remove={this.deleteModule.bind(this)}/>
            }, this);
        return modules;
    }

    render() { return (
        <div>
            <br/>
            <input className="form-control"
                   onChange={this.titleChanged}
                   value={this.state.module.title}
                   placeholder="title"/>
            <button onClick={this.createModule} className="btn btn-primary btn-block">
                <i className="fa fa-plus"></i>
            </button>

            <ul className="list-group">
                {this.renderListOfModules()}
            </ul>
        </div>
    )
    }

    deleteModule(event,moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(()=>this.findAllModulesForCourse(this.state.courseId));
    }
}
