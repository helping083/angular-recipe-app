import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable()

export class DataStorageService {
  getDataSubject: Subject<boolean> = new Subject<true>();
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-f7f98.firebaseio.com/recipes.json', recipes).subscribe((item) => {
      console.log(item);
    });
  }

  fetchRecipes(): Observable<any> {
    return this.http.get<Recipe[]>("https://ng-course-recipe-book-f7f98.firebaseio.com/recipes.json")
      .pipe(map((recipe) => {
        console.log(recipe)
        this.getDataSubject.next(false);
        return recipe.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
