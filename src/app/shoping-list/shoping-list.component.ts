import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  providers: []
})
export class ShopingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEdit(id: number) {
    this.shoppingListService.editItem(id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

