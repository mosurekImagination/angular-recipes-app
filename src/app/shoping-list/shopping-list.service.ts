import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  editingItem = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    (new Ingredient('Apples', 5)),
    (new Ingredient('Tomatoes', 5))
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editItem(id: number) {
    this.editingItem.next(id);
  }

  deleteIngredient(id: number) {
    if(this.ingredients.length===1) this.ingredients=[];
    this.ingredients = this.ingredients.splice(id - 1, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  editIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id].name = ingredient.name;
    this.ingredients[id].amount = ingredient.amount;

  }
}
