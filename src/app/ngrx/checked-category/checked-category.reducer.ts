import { createReducer, on } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/Category.model';
import {
  fetchCheckedCategory,
  resetCheckedCategory,
} from './checked-category.action';

const initialState: CategoryModel = { _id: '', categoryName: '' };

export const checkedCategoryReducer = createReducer(
  initialState,
  on(fetchCheckedCategory, (state, { checkedCategory }) => checkedCategory),
  on(resetCheckedCategory, () => {
    return { _id: '', categoryName: '' };
  })
);
