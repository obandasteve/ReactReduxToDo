import React, { Component, PropTypes } from 'react';

class TaskTextArea extends Component {
    render() {
        let text = this.props.text;

        return (
            <div>
                <p className="task_text">{text}</p>
            </div>
        );
    }
}

TaskTextArea.propTypes = {
    text: PropTypes.string.isRequired
}

export default TaskTextArea;