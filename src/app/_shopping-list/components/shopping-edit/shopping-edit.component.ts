import { Ingredient } from './../../../models/ingredients.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, VERSION } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingeditComponent implements OnInit {
  @ViewChild('nameInput', {static: false})   private nameInmput: ElementRef;
  @ViewChild('amountInput', {static: false}) private amointInput: ElementRef;
  @Output() public ingredientAdded: EventEmitter<{name: string, amount: number}> = new EventEmitter<{name: string, amount: number}>();
  constructor() { }

  ngOnInit() {
  }

  public onAddItem(): void {
    const ingredient: Ingredient = new Ingredient(this.nameInmput.nativeElement.value, this.amointInput.nativeElement.value);
    this.ingredientAdded.emit(ingredient);
  }
}