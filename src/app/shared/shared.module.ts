import { DropdownInputComponent } from './partials/dropdown-input/dropdown-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const ListComponents = [
  DropdownInputComponent
]

@NgModule({
  declarations: [...ListComponents],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [...ListComponents]
})
export class SharedModule { }
