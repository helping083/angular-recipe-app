import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10)
  ];
  constructor() { }

  ngOnInit() {
  }
  public onIngrediendAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}