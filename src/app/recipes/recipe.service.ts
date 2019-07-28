import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()
  private recipes: Recipe[] = [
    new Recipe('Pastsssa',
               'Pasta wssssssssith Mushroms',
               'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*',
               [
                 new Ingredient('Meat', 1),
                 new Ingredient('French Fies', 10)
               ]),
    new Recipe('Pasta',
                'Pasta with Mushroms',
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*',
                [
                  new Ingredient('Buns', 1),
                  new Ingredient('meat',1)
                ])
  ];
  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
