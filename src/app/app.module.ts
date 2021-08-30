import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './_recipes/recipes.module';
import { ShoppingListModule } from './_shopping-list/shopping-list.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, SharedModule, AppRoutingModule, RecipesModule, ShoppingListModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
