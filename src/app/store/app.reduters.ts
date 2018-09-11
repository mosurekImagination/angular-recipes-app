import * as fromShoppingList from '../shoping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducers';
import {ActionReducerMap} from '@ngrx/store';
import {shoppingListReducer} from '../shoping-list/store/shopping-list.reducer';
import {authReducer} from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
