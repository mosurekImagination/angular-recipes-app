import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class RecipeService {

  selectedRecipe = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipies: Recipe[] = [
    new Recipe('Schabowy',
      'Tradycyjny polski kotlet - zwany schabowym',
      'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
      [new Ingredient('Filet z piersi', 1),
        new Ingredient('Panierka Knorr', 3)
    ]),
    new Recipe('Leczo',
      'Bardzo dobre leczo na miensie',
      'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
      [new Ingredient('Papryka', 3),
        new Ingredient('Gotowe leczo Knorr', 5)
      ])
    ];

  getRecipes() {
    return this.recipies.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipies.slice(id, id+1)[0];
  }

  getRecipeId(recipe: Recipe) {
    return this.recipies.findIndex((p: Recipe) => {
      return p.name === recipe.name;
    });
  }

  addRecipe(newRecipe: Recipe) {
    this.recipies.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipies[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipies.splice(id, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipies = recipes;
    this.recipesChanged.next(this.recipies);
  }
}
