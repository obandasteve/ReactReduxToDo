import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskActionCreators from '../actions/taskActionCreators';

import TaskTextArea from './TaskTextArea';
import TaskEditArea from './TaskEditArea';

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleDelete =  this.handleDelete.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }

    handleEditToggle(event) {
        console.log('Props in handleEdit toggle ', this.props);
        let id = this.props.id;
        let isEditing = this.props.isEditing;
        console.log('Dispatching handle toggle edit...',id,isEditing);
        return this.props.isEditingToggle(id, isEditing);
    }

    handleDelete(event) {
        console.log('Deleting item..',this.props.id);
        this.props.deleteTask(this.props.id); // dispatch task deletion
    }

    handleColor(event) {
        let { id, color, text, isEditing, isDeleting } = this.props;
        // prepare dispatch payload
        color = !this.props.color;
        id = this.props.id;
        text = this.props.text;
        isEditing = this.props.isEditing;
        isDeleting = this.props.isDeleting;
        // dispatch color toggle event
        console.log(this.props.text);
        console.log('Toggling color in TaskCard...', id, color, text, isEditing, isDeleting);
        this.props.taskDone(id, text, color, isEditing, isDeleting);
    }

    _taskTextArea() {
        const text_component = this.props.isEditing ? 
            <TaskEditArea text={this.props.text} id={this.props.id} isEditing={this.props.isEditing} /> :
            <TaskTextArea text={this.props.text} id={this.props.id} isEditing={this.props.isEditing} /> ; 
        
        return text_component;
    }

    _doneIcon() {
        const { color } = this.props;
        let eye_icon =  <i className={"icon icon--done fa fa-" + (color ? "check-circle-o" : "circle-thin")} 
                            aria-hidden="true" onClick={this.handleColor}></i>;
        return eye_icon;
    }

    render() {
        return (
            <div className="task_card">
                <span className="eye_icon">
                   { this._doneIcon() }
                </span>
               
                { this._taskTextArea() }

                <div className="task_controls">
                    <span className="task_controls--edit" >
                        <i className="fa fa-pencil icon icon--edit" aria-hidden="true" onClick={this.handleEditToggle} ></i>
                    </span>

                    <span className="task_controls--delete" >
                        <i className="fa fa-trash icon icon--delete" aria-hidden="true" onClick={this.handleDelete} ></i>
                    </span>
                </div>
            </div>
        );
    }
}

TaskCard.propTypes = {
    deleteTask: PropTypes.func,    
    taskDone: PropTypes.func,
    isEditing: PropTypes.boolean,
}

const mapStateToProps = (state) => {
    return { }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (id) => dispatch(TaskActionCreators.deleteTask(id)),
        taskDone: (id, done, text, isEditing, isDeleting) => {
            dispatch(TaskActionCreators.taskDone(id, text, isEditing, isDeleting))
        },
        isEditingToggle: (id, editing_state) => dispatch(TaskActionCreators.isEditingToggle(id, editing_state)),
    }
}

const TaskCardContainer = connect(mapStateToProps, mapDispatchToProps)(TaskCard)

export default TaskCardContainer;
