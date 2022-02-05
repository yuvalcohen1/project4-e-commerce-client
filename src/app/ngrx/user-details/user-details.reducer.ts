import { createReducer, on } from '@ngrx/store';
import { UserDetailsModel } from 'src/app/models/UserDetails.model';
import {
  fetchUserDetails,
  resetUserDetailsToNull,
} from './user-details.action';

const initialState = null;

export const userDetailsReducer = createReducer(
  initialState,
  on(
    fetchUserDetails,
    (state: UserDetailsModel | null, { userDetails }) => userDetails
  ),
  on(resetUserDetailsToNull, () => initialState)
);
