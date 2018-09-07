import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopingListComponent} from './shoping-list.component';
import {ShopingEditComponent} from './shoping-edit/shoping-edit.component';

const shoppingListRoutes: Routes = [
  { path: 'shoping-list', component: ShopingListComponent, children: [
      { path: ':id', component: ShopingEditComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
