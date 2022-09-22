import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/pipes/pipes.module';

import { AditionalDataPageRoutingModule } from './aditional-data-routing.module';

import { AditionalDataPage } from './aditional-data.page';
import { RegisterPageModule } from '../register/register.module';
import { DirectivesModule } from '@app/directives/directives.module';

@NgModule({
  imports: [
    PipesModule,
    FormsModule,
    IonicModule,
    CommonModule,
    DirectivesModule,
    FontAwesomeModule,
    RegisterPageModule,
    ReactiveFormsModule,
    AditionalDataPageRoutingModule

  ],
  declarations: [AditionalDataPage]
})
export class AditionalDataPageModule {}
