import { createAction, props } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/Category.model';

export const fetchCheckedCategory = createAction(
  '[Categories Component] Fetch Checked Category',
  props<{ checkedCategory: CategoryModel }>()
);

export const resetCheckedCategory = createAction(
  '[Categories Component] Reset Checked Category'
);
