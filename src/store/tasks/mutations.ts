import {getStoreAccessors} from 'typesafe-vuex';

import {ITask} from '@/models/tasks';
import {State} from '@/store/state';

import {TasksState} from './state';


export const mutations = {
    setTasks: (state: TasksState, payload: ITask[]) => {
        state.tasks = payload;
    },
    setTask: (state: TasksState, payload: ITask) => {
        const tasks = state.tasks.filter((task: ITask) => task.id !== payload.id);
        tasks.push(payload);
        state.tasks = tasks;
    },
};

const {commit} = getStoreAccessors<TasksState, State>('');

export const commitSetTask = commit(mutations.setTask);
export const commitSetTasks = commit(mutations.setTasks);
