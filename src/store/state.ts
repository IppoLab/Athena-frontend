import {MainState} from './main/state';
import {AdminState} from '@/store/admin/state';

export interface State {
    main: MainState;
    admin: AdminState;
}
