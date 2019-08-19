import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';



@Injectable()

export class RecipeService {
  recipeSubj: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe('Pastsssa',
    //            'Pasta wssssssssith Mushroms',
    //            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*',
    //            [
    //              new Ingredient('Meat', 1),
    //              new Ingredient('French Fies', 10)
    //            ]),
    // new Recipe('Pasta',
    //             'Pasta with Mushroms',
    //             'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-potato-recipes-1542129692.jpg?crop=0.904xw:0.678xh;0.0959xw,0.295xh&resize=480:*',
    //             [
    //               new Ingredient('Buns', 1),
    //               new Ingredient('meat',1)
    //             ])
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.slice()[id]
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeSubj.next([...this.recipes])
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]): void {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeSubj.next(this.recipes.slice())
  }

  updateRecipe(index:number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeSubj.next(this.recipes.slice())
  }
  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipeSubj.next(this.recipes.slice());
  }
}
