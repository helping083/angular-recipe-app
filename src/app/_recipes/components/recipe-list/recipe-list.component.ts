import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../../models';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() public recipeWasSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  public recipes: Recipe[] = [
    new Recipe(
      'super test','this is a test', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574'
    ),
  ];
  constructor() { }

  ngOnInit() {
  }

  public onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
  }
}