import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../app/shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;
  a = 1;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {  
      this.ingredients = this.shoppingListService.getIngredients();
      this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingr: Ingredient[])=>{
        this.ingredients = ingr;
      });      
  }

  deleteIngredient(i:number): void {
    this.shoppingListService.deleteIngredients(i);
    this.shoppingListService.callBackFn(this.a);
  }

  onEditItem(id:number):void {
    this.shoppingListService.editItem.next(id);
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();    
  }
}
