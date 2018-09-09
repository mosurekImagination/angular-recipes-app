import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {RecipeService} from '../../recipes/recipe.service';
import {AuthService} from '../../auth/auth.service';
import {Recipe} from '../../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeData()
      .subscribe( (response) => {
        console.log(response);
    });
  }

  loadData() {
    this.dataStorageService.getData()
      .subscribe( (response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      });
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
