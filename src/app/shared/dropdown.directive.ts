import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // private isOpen = false;
  //
  // constructor(private renderer: Renderer2, private hostElement: ElementRef) {
  // }
  //
  // @HostListener('click') onClick() {
  //   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
  //   if(!this.isOpen) {
  //     this.renderer.addClass(this.hostElement.nativeElement, 'open');
  //   }
  //   else {
  //     this.renderer.removeClass(this.hostElement.nativeElement, 'open')
  //   }
  //   this.isOpen = !this.isOpen;
  // }

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
