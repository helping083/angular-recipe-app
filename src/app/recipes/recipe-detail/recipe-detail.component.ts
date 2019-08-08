import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipeData: Recipe;
  id: number;
  private snapshotParam;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.snapshotParam = id;
    console.log('snapshot-id', this.snapshotParam);
    this.route.params.subscribe((item: Params)=>{
      this.id = +item['id'];
      this.selectedRecipeData = this.recipeService.getRecipe(this.id);
    });
  }
  
  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipeData.ingredients);
  }
  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
