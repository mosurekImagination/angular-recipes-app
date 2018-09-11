import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  backend = 'https://angular-recipe-18649.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}


  storeData() {
    return this.http.put(this.backend,
      this.recipeService.getRecipes());
  }

  getData() {
    return this.http.get(this.backend);
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.backend)
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ));
  }
}
