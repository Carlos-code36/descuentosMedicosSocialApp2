import { ValidationFormDirective } from './validation-form.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { HelperFocusDirective } from './helper-focus.directive';

const listDirectives = [
  ValidationFormDirective,
  HelperFocusDirective,
  HideHeaderDirective
]

@NgModule({
  declarations: [...listDirectives],
  exports: [...listDirectives],
  imports: [CommonModule]
})
export class DirectivesModule { }
