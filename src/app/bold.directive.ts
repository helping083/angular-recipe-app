import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.transform = "translateX(10px)";
    console.log(this.elementRef)
  }

}
