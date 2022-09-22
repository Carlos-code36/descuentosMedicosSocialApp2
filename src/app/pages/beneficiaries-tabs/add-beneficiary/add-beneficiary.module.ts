import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '@directives/directives.module';
import { ComponentsModule } from '@components/components.module';
import { PipesModule } from '@pipes/pipes.module';

import { AddBeneficiaryPageRoutingModule } from './add-beneficiary-routing.module';
import { AddBeneficiaryPage } from './add-beneficiary.page';

@NgModule({
  imports: [
    FormsModule,
    PipesModule,
    IonicModule,
    CommonModule,
    DirectivesModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AddBeneficiaryPageRoutingModule
  ],
  declarations: [AddBeneficiaryPage]
})
export class AddBeneficiaryPageModule {}
