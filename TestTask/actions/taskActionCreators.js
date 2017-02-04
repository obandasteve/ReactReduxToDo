import { TASKS_READ, TASK_ADD, TASK_EDIT, TASK_DELETE,
     TASK_DONE, TASK_ADD_TOGGLE, TASK_EDIT_TOGGLE } from '../constants/constants';

import { tasks } from './tasks';


let TaskActionCreators = {
    fetchTasks() {
      console.log('load the state', tasks);
      return {
        type: TASKS_READ,
        tasks: tasks
      }
    },
 

    addTask(id, text, color) {
        console.log('Addition params ',id,text,color);
        return {
            type: TASK_ADD,
            id: id,
            text: text,
            color: false
        };
    },

    editTasks(id, text) {
        return {
            type: TASK_EDIT,
            id: id,
            text: text
        }
    },

    deleteTask(id) {
        return {
            type: TASK_DELETE,
            id: id,
        }
    },

    taskDone(id, done, text, isEditing, isDeleting) {
        return {
            type: TASK_DONE,
            id: id,
            text: text,
            done: done,
            isEditing: isEditing,
            isDeleting: isDeleting
        }
    },

    isAddingToggle(isAdding) {
        return {
            type: TASK_ADD_TOGGLE,
            isAdding: isAdding
        }
    },

    isEditingToggle(id, isEditing) {
        return {
            type: TASK_EDIT_TOGGLE,
            id: id,
            isEditing: isEditing
        }
    }
};

export default TaskActionCreators;
