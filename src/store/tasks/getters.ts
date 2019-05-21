import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';

import {TasksState} from './state';


export const getters = {
    tasks: (state: TasksState) => state.tasks,
    taskById: (state: TasksState) => (taskId: string) => {
        const filteredTasks = state.tasks.filter((task) => task.id === taskId);
        if (filteredTasks.length > 0) {
            return filteredTasks[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<TasksState, State>('');

export const readTaskById = read(getters.taskById);
export const readTasks = read(getters.tasks);

