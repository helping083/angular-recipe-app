import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipewasSelected = new EventEmitter<Recipe>();
   recipes: Recipe[] = [
    new Recipe('Pastsssa','Pasta wssssssssith Mushroms','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*'),
    new Recipe('Pasta','Pasta with Mushroms','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*')
  ]
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe, inds: number): void {
    this.recipewasSelected.emit(recipe);
    console.log(inds);
  }
}
