import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ajax } from 'rxjs/ajax';
import { map, last, merge } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
   @ViewChild('ajaxButton', {static: false}) ajaxButton: ElementRef;
   recipes: Recipe[];
  constructor(private recipeServise: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeServise.getRecipes()
  }
  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
    console.log('activeroute', this.router);
  }
  onAjax():Observable<any> {
    let apiData = ajax('https://jsonplaceholder.typicode.com/posts');
    const second = ajax('https://jsonplaceholder.typicode.com/posts/1');
    return apiData.pipe(merge(second));
  }
}
