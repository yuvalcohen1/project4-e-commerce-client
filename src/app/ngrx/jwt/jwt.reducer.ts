import { createReducer, on } from '@ngrx/store';
import { fetchJwt, resetJwt } from './jwt.action';

const initialState: string = '';

export const jwtReducer = createReducer(
  initialState,
  on(fetchJwt, (state, { jwt }) => jwt),
  on(resetJwt, () => initialState)
);
