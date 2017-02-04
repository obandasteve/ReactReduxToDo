import { TASKS_READ, TASK_ADD, TASK_EDIT, TASK_DELETE,
     TASK_DONE, TASK_ADD_TOGGLE, TASK_EDIT_TOGGLE } from '../constants/constants';

import update from 'react-addons-update'; // for immutable state updates

const tasks = [];

const TaskReducer = (state = tasks, action) => {
    switch(action.type) {
        case TASKS_READ:
            console.log('taskread action payload ', action);
            return update(state, {tasks: {$set: action.tasks}});

        case TASK_ADD:
            console.log('Old State in taskadd reducer is...',state);
            let new_task = [{
                id : action.id,
                text : action.text,
                color: false,
                isEditing: false,
                isDeleting: false
            }];

            return update(state, {tasks: {$push: new_task }});

        case TASK_ADD_TOGGLE:
            console.log('New task being added...',action.isAdding);


            return Object.assign({}, state, {isAdding: action.isAdding});

        case TASK_DONE:
            console.log('Toggling color/done_state for task...',action.id, action.done);
            let toggled_tasks = state.tasks.map(t => {
                if (t.id == action.id) {
                    return (update(t, {color: {$set : action.done }} ));
                } else {
                    return t;
                }
            });

            return update(state, { tasks : { $set : toggled_tasks }});

        case TASK_EDIT_TOGGLE:
            console.log('Toggling isEditing state for task...',action.id);
            let updated_tasks = state.tasks.map(t => {
                if (t.id == action.id) {
                    return (update(t, {isEditing: {$set : !action.isEditing }} ));
                } else if (t.id !== action.id && t.isEditing == true){
                    return (update(t, {isEditing: {$set : false }} ));
                } else{
                    return t;
                }
            });

            return update(state, { tasks : { $set : updated_tasks}});

        case TASK_EDIT:
            console.log("Doing a real edit for a task...",action.id);
            let edited_tasks = state.tasks.map(t => {
                if (t.id == action.id) {
                    return (update(t, {text: {$set : action.text }} ));
                } else {
                    return t;
                }
            });
            console.log("Updated tasks in state is", edited_tasks);

            return update(state, { tasks : { $set : edited_tasks } });

        case TASK_DELETE:
            console.log('Deleting a task...', action.id);

            let nondeleted_tasks = state.tasks.filter(task => task.id !== action.id);
            console.log('NonDeleted Tasks in state...', nondeleted_tasks);

            return update(state, { tasks: { $set : nondeleted_tasks } });

        default:
            return state;
    }

};

export default TaskReducer;
