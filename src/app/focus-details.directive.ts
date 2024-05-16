import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFocusDetails]',
  standalone: true
})
export class FocusDetailsDirective {
  constructor(private el: ElementRef) {}

  @Input('appRadioStyle') styleProperty: string | undefined;
  @HostListener('click') onClick() {
    switch (this.styleProperty) {
      case 'title':
        this.el.nativeElement.style.fontWeight = 'bold';
        this.el.nativeElement.style.fontSize = '1.5rem';
        break;
      case 'ingredient':
        this.el.nativeElement.style.fontWeight = 'bold';
        this.el.nativeElement.style.fontSize = '1.5rem';
        break;
      case 'measure':
        this.el.nativeElement.style.fontWeight = 'bold';
        this.el.nativeElement.style.fontSize = '1.5rem';
        break;
      default:
        break;
    }
  }
}
