import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editingMode = false;
  editingId: number;
  constructor(private shoppingListService: ShoppingListService) { }

  loadEditingItem(ingredient: Ingredient) {
    this.form.form.patchValue({
      name: ingredient.name,
      amount: ingredient.amount
    });
  }
  ngOnInit() {
    this.subscription = this.shoppingListService.editingItem
      .subscribe((id: number) => {
        this.editingMode = true;
        this.editingId = id;
        this.loadEditingItem(this.shoppingListService.getIngredients()[this.editingId]);
      });
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    if (this.editingMode) {
     this.shoppingListService.editIngredient(this.editingId, new Ingredient(value.name, value.amount));
     this.editingMode = false;

    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.form.reset();
    this.editingMode = false;
  }

  onDelete() {
    if (this.editingMode) {
      this.shoppingListService.deleteIngredient(this.editingId);
      this.onClear();
    }
  }
}
