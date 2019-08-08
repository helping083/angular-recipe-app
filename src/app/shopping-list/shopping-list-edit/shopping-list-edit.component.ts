import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, Form } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) form: NgForm;
  editItemSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editItemSubscription = this.shoppingListService.editItem.subscribe((index:number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    });
  }
  onAddItem(f:NgForm):void {
    const value = f.value;
    const newIngerdient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngerdient);
  }
  clearForm(f:NgForm):void {
    f.resetForm()
  }
  ngOnDestroy() {
    this.editItemSubscription.unsubscribe();
  }
}
