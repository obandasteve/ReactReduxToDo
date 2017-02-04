import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskActionCreators from '../actions/taskActionCreators';

class EditArea extends Component {
    constructor () {
        super();
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {
        if (event.key == "Enter") {
            let id, text, idEditing;
            id = this.props.id;
            text = event.target.value;
            console.log("(Before dispatch) Editing a task...",this.props.isEditing);
            if (text.length > 0) this.props.editTask(id, text); // dispatch Action to add task
            this.props.isEditingToggle(id, this.props.isEditing); // remove the input bar
        }
    }

    render() {
        let text = this.props.text;

        return (
            <div>
                <input type="text" className="task_edit_form form-control" 
                    defaultValue={this.props.text}
                    onChange={this.handleEdit}
                    onKeyPress={this.handleEdit} />
            </div>
        );
    }
}

EditArea.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    isEditing: PropTypes.boolean,
    editTask: PropTypes.func,
    isEditingToggle: PropTypes.func,
}

const mapStateToProps = (state) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask: (id, text) => dispatch(TaskActionCreators.editTasks(id, text)),
        isEditingToggle: (id, editing_state) => dispatch(TaskActionCreators.isEditingToggle(id, editing_state)),
    }
}

const TaskEditArea = connect(mapStateToProps, mapDispatchToProps)(EditArea);

export default TaskEditArea;