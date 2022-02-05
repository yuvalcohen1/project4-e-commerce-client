import { createAction, props } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/Category.model';

export const fetchCategories = createAction(
  '[Category Component] Fetch Categories',
  props<{ categories: CategoryModel[] }>()
);
