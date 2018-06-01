import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';

export default class ModuleList
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId : '',
            module: {title:''},
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
        let module ;
        if(this.state.module.title==''){
            module = {title:"New Module"};
        } else{
            module = this.state.module;
        }
        this.moduleService
            .createModule(this.props.courseId, module)
            .then(() => {this.findAllModulesForCourse(this.props.courseId)})
    }

    titleChanged(event) {
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
                    remove={this.deleteModule.bind(this)}
                    setModule={this.props.setModule}/>
            }, this);
        return modules;
    }

    render() { return (
        <div>
            <br/>
            <input className="form-control"
                   onChange={this.titleChanged}
                   value={this.state.module.title}
                   placeholder="New Module Title"/>
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
        const confirmation = window.confirm("Are you sure to delete this module?");
        if(confirmation) {
            this.moduleService
                .deleteModule(moduleId)
                .then(()=>this.findAllModulesForCourse(this.state.courseId));
        }
    }
}
