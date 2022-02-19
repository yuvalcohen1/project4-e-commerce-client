import { createReducer } from '@ngrx/store';

const initialState: string[] = [
  'Jerusalem',
  'Tel Aviv',
  'Haifa',
  'Rishon Lezion',
  'Petah Tikva',
  'Ashdod',
  'Netanya',
  'Beer Sheva',
  'Bnei Brak',
  'Holon',
];

export const citiesReducer = createReducer(initialState);
