import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shoping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Store} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shoping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipe: Recipe;
 id: number;

  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<{
                shoppingList:
                  { ingredients: Ingredient[] }
              }>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipeById(this.id);
          // this.recipe = this.recipeService.getRecipes().find( (r: Recipe) =>{
          //   return r.name === params['name'];
        });
  }

  addToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    //this.slService.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
