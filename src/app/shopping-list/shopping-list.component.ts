import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../app/shared/Ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('banana', 2)
  ];

  constructor() { }

  ngOnInit() {  
  }

  showNewIng(ingredient: Ingredient):void {
    this.ingredients.push(ingredient);
  }
}
