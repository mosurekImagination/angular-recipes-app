import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  backend = 'https://angular-recipe-18649.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) {}

  getAuthParam() {
  return new HttpParams().set('auth', this.authService.getToken());
  }
  storeData() {
    const token = this.authService.getToken();
    return this.http.put(this.backend,
      this.recipeService.getRecipes());
  }

  getData() {
    const token = this.authService.getToken();
    return this.http.get(this.backend);
  }

  getRecipes() {
    const token = this.authService.getToken();

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
