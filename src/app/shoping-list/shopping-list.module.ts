import {NgModule} from '@angular/core';
import {ShopingEditComponent} from './shoping-edit/shoping-edit.component';
import {ShopingListComponent} from './shoping-list.component';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShopingEditComponent,
    ShopingListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {

}
