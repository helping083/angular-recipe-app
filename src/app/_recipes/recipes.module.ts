import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent }from './recipes.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe-list/recipe-detail/recipe-detail.component'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecipesComponent, RecipeListComponent, RecipeItemComponent, RecipeDetailComponent],
  exports: [RecipesComponent, RecipeListComponent, RecipeItemComponent, RecipeDetailComponent]
})
export class RecipesModule { }