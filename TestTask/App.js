import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import TaskActionCreators from './actions/taskActionCreators';
import taskStore from './store/taskStore';

import TaskCardContainer from './components/TaskCard';


class App extends Component {
	constructor(props) {
		super(props);
		this.handleAdd = this._handleAdd.bind(this);
	}

  componentDidMount() {
    // setTimeout(this.props.fetchTasks(), 2000); // to test spinner
    this.props.fetchTasks();
  }

	_handleAdd(event) {
		if (event.key == "Enter") {
			let id, text;
			// use a unique id for newly cleated tasks
			id = Date.now();
			text = event.target.value;
			console.log("Adding task....id ",id, text);
			if (text.length > 0) this.props.addTask(id, text); // dispatch Action to add task
			event.target.value = ""; // empty input bar
		}
	}

	_handleTaskAddToggle(event) {
		let isAdding = !this.props.isAdding; // dispatch handleTaskAddToggle action
		this.props.isAddingToggle(isAdding);
	}

  _renderTasks() {
    let task_components;
    
    if (this.props.tasks.tasks && this.props.tasks.tasks.length) {
      task_components = this.props.tasks.tasks.map(task => 
        <TaskCardContainer
          key={ task.id }
          id={ task.id } 
          color={ task.color }
          text={ task.text } 
          isEditing={ task.isEditing }
          isDeleting={ task.isDeleting } /> );
    } else {
      task_components = <div>no posts yet!</div>
    }

    return task_components;
  }

	render() {

		return (
			<div className="container">
          <h4 className="heading text-primary">Add, Edit and Delete Tasks</h4>
					<input type="text" className="form-control task_input"
							  onKeyPress={this.handleAdd} placeholder=" Type and press 'enter' ..." />

        { this._renderTasks() }

			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array,
	addTask: PropTypes.func.isRequired,
}

// redux 

const mapStateToProps = (state) => {
  console.log('state in App is ', state);
	return {
		tasks: state,
		isAdding: state.isAdding,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasks: () => dispatch(TaskActionCreators.fetchTasks()),
		addTask: (id, text) => dispatch(TaskActionCreators.addTask(id, text)),
	}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

render(
	<Provider store={taskStore}>
	   <AppContainer/>
	</Provider>,
	document.getElementById('root')
);
