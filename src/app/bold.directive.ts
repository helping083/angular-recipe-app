import { Directive, ElementRef, HostListener, Renderer2, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBold]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'showCLasses()'
  }
})
export class BoldDirective implements OnInit {
  @Input() defaultColor: string;
  @HostBinding('class.hello') isOpen = false

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    
  }

  ngOnInit() {
    console.log('inputin directive', this.defaultColor);
  }

  onMouseEnter() {
    let es = this.elementRef.nativeElement.childNodes[1];
    // es.style.transform = 'translateY(-200%)';

  }

  onMouseLeave():void {
    let es = this.elementRef.nativeElement.childNodes[1];
    // es.style.transform = 'translateY(200%)';
  }

  showCLasses():void {
    this.isOpen = !this.isOpen;
  }

  private setFontWeight(addClass: string, removeCls:string):void {
    this.renderer.addClass(this.elementRef.nativeElement, addClass);
    this.renderer.removeClass(this.elementRef.nativeElement,removeCls)
  }

}
