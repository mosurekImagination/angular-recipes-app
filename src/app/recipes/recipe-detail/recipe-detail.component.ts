import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shoping-list/shopping-list.service';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipe: Recipe;

  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipeById(+params['id']);
          // this.recipe = this.recipeService.getRecipes().find( (r: Recipe) =>{
          //   return r.name === params['name'];
        });
  }

  addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
