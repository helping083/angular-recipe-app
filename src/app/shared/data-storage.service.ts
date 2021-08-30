import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable()

export class DataStorageService {
  getDataSubject: Subject<boolean> = new Subject<true>();
  private updateRecipesLink: string = 'https://ng-course-recipe-book-f7f98.firebaseio.com/recipes.json';
  private getRecipesLink: string = "https://ng-course-recipe-book-f7f98.firebaseio.com/recipes.json";

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put( this.updateRecipeLinkGetter, recipes).subscribe((item) => {
      console.log(item);
    });
  }

  fetchRecipes(): Observable<any> {
    return this.http.get<Recipe[]>(this.getRecipesLinkFirebase)
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

  get updateRecipeLinkGetter() {
    return this.updateRecipesLink;
  }
  get getRecipesLinkFirebase() {
    return this.getRecipesLink;
  }
  
}
