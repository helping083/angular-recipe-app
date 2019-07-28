import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  names: String = ''
  amounts: String|number = ''
  @ViewChild('nameOfIngredient', {static:false}) nameOfIngredient: ElementRef;
  @ViewChild('amountOfIngredient', {static:false}) amountOfIngredient: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {

  }

  showTest(): void {
    const newIng = new Ingredient(this.nameOfIngredient.nativeElement.value, Number(this.amountOfIngredient.nativeElement.value));
    this.shoppingListService.addIngredient(newIng);
  }
}
