import React from 'react';

export default class ModuleListItem
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
            <li className="list-group-item" style={liStyle}
                onClick={(event,moduleId = this.props.module.id)=>
                {this.props.setModule(event,moduleId); this.props.onClick(event)}}>
                <label className="col-form-label font-weight-bold">{this.props.title}</label>
                <span className="float-right">
                    <button type="button" className="btn btn-danger"
                            onClick={(event,moduleId = this.props.module.id)=>this.props.remove(event,moduleId)}>
                            <i className="fa fa-times"></i>
                    </button>
                </span>
            </li>
        );
    }
}
