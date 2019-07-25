import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameOfIngredient', {static:false}) nameOfIngredient: ElementRef;
  @ViewChild('amountOfIngredient', {static:false}) amountOfIngredient: ElementRef;
  @Output() addNewIngredient = new EventEmitter<Ingredient>();

  
  constructor() { }

  ngOnInit() {
  }

  showTest(): void {
    const newIng = new Ingredient(this.nameOfIngredient.nativeElement.value, this.amountOfIngredient.nativeElement.value);
    this.addNewIngredient.emit(newIng);
  }
}
