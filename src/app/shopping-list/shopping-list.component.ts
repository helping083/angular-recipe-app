import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../app/shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {  
      this.ingredients = this.shoppingListService.getIngredients();
      this.shoppingListService.ingredientsChanged.subscribe((ingr: Ingredient[])=>{
        this.ingredients = ingr;
      });
  }

  deleteIngredient(i:number): void {
    this.ingredients.splice(i,1)
  }
}
