import { Directive } from '@angular/core';

@Directive({
  selector: '[helperFocus]'
})
export class HelperFocusDirective {

  constructor() {
    console.log('Initialized *Helper Focus* directive');
  }
}
