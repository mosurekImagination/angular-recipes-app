import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  backend = 'https://angular-recipe-18649.firebaseio.com/recipes.json';
  constructor(private http: Http, private recipeService: RecipeService,
              private authService: AuthService) {}

  storeData() {
    const token = this.authService.getToken();
    return this.http.put(this.backend + '?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  getData() {
    const token = this.authService.getToken();
    return this.http.get(this.backend + '?auth=' + token);
  }
}
