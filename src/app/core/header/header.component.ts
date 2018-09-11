import {Observable} from 'rxjs/internal/Observable';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {RecipeService} from '../../recipes/recipe.service';
import {AuthService} from '../../auth/auth.service';
import {Recipe} from '../../recipes/recipe.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reduters';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
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

  logout() {
    this.authService.logout();
  }
}
