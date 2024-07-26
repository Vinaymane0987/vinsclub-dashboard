import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserResponseInterface } from '../types/users.interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserResponseInterface[] }>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});
