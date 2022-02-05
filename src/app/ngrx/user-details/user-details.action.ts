import { createAction, props } from '@ngrx/store';

export const fetchUserDetails = createAction(
  '[Users Component] Fetch User Details',
  props<{ userDetails: any }>()
);

export const resetUserDetailsToNull = createAction(
  '[Users Component] Reset User Details'
);
