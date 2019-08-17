import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((item: Params)=>{
      this.id = +item['id'];
      this.isEdit = item['id'] != null;
      this.initForm();
    });
  }


  private initForm() { 
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = ''
    let recipeIngredients = new FormArray([]);

    if(this.isEdit) {
      const recipe = this.recipeService.getRecipe(this.id);
      let ings = recipe['ingredients'];
      recipeName = recipe.name;
      recipeImagePath  = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for( let i = 0; i<ings.length; i++) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ings[i].name, [Validators.required]),
            'amount': new FormControl(ings[i].amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        };
      };
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onSubmit():void {
    const newRecipe = new Recipe(
                          this.recipeForm.value['name'],
                          this.recipeForm.value['description'],
                          this.recipeForm.value['imagePath'],
                          this.recipeForm.value['ingredients']
                      );
    if(this.isEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancelEdit();
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get image(): AbstractControl{
    return this.recipeForm.get('imagePath')
  }

  onAddIng():void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancelEdit():void {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteElFromFArray(i: number):void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
