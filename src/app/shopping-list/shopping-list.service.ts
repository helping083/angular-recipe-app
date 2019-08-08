import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  editItem: Subject<number>=new Subject<number>();

   ingredients: Ingredient[] = [
    new Ingredient('banana', 2),
    new Ingredient('apple',5)
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredients(id: number): void {
    this.ingredients.splice(id,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index:number):Ingredient {
    return this.ingredients[index];
  }

  callBackFn(cb): void {
    let a = cb;
    console.log('a',a)
  }
}
