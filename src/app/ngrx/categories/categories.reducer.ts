import { createReducer, on } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/Category.model';
import { fetchCategories } from './categories.action';

const initialState: CategoryModel[] = [];

export const categoriesReducer = createReducer(
  initialState,
  on(fetchCategories, (state, { categories }) => categories)
);
