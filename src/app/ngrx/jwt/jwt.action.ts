import { createAction, props } from '@ngrx/store';

export const fetchJwt = createAction(
  '[Users Component] Fetch Jwt',
  props<{ jwt: string }>()
);

export const resetJwt = createAction('[Users Component] Reset Jwt');
