import { createFeature, createReducer, on } from '@ngrx/store';
import { UserResponseInterface } from '../types/users.interface';
import { UserActions } from './actions';

export interface UserState {
  users: UserResponseInterface[];
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  error: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, error: null })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
});

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectError,
  selectUsers,
  selectUserState,
} = userFeature;
