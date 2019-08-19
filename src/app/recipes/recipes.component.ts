import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  isRecipe: boolean = true;
  
  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
   this.dataStorageService.getDataSubject.subscribe((item)=>{
     this.isRecipe = item;
     console.log('boolean subject', item);
   })
  }

}
