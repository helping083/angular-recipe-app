import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingeditComponent } from './components/shopping-edit/shopping-edit.component'
import { ShoppingListComponent} from './shopping-list.component'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShoppingeditComponent, ShoppingListComponent],
  exports: [ShoppingeditComponent, ShoppingListComponent]
})
export class ShoppingListModule { }