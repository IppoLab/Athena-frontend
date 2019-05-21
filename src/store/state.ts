import {AppState} from './app/state';
import {AuthState} from './auth/state';
import {UsersState} from './users/state';
import {SubjectsState} from './subjects/state';
import {SpecialitiesState} from './specialities/state';
import {GroupsState} from './groups/state';
import {TasksState} from './tasks/state';

export interface State {
    app: AppState;
    auth: AuthState;
    users: UsersState;
    subjects: SubjectsState;
    specialities: SpecialitiesState;
    groups: GroupsState;
    tasks: TasksState;
}
