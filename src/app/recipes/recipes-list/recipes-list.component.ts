import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ajax } from 'rxjs/ajax';
import { map, last, merge } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})

export class RecipesListComponent implements OnInit, OnDestroy {
   @ViewChild('ajaxButton', {static: false}) ajaxButton: ElementRef;
   recipes: Recipe[];
   recipesSubscripton: Subscription;

   constructor(private recipeServise: RecipeService, 
                private router: Router, 
                private route: ActivatedRoute,
                private dataService: DataStorageService
              ) { }

  ngOnInit() {
    this.dataService.fetchRecipes().subscribe((item)=>{
        this.recipes = item;
    });
    // this.recipes = this.recipeServise.getRecipes();
    this.recipesSubscripton = this.recipeServise.recipeSubj.subscribe((item: Recipe[])=>{
      this.recipes = item;
    });
  }
  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  onAjax():Observable<any> {
    let apiData = ajax('https://jsonplaceholder.typicode.com/posts');
    const second = ajax('https://jsonplaceholder.typicode.com/posts/1');
    return apiData.pipe(merge(second));
  }

  ngOnDestroy() {
    this.recipesSubscripton.unsubscribe();
  }
}
