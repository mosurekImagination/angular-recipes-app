import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
}

const initialState: State= {
  ingredients: [
    (new Ingredient('Apples', 5)),
    (new Ingredient('Tomatoes', 5))
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListAction) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    default:
      return state;
  }
}
