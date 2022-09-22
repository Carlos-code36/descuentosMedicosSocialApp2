import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBeneficiaryPageRoutingModule } from './edit-beneficiary-routing.module';

import { EditBeneficiaryPage } from './edit-beneficiary.page';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EditBeneficiaryPageRoutingModule
  ],
  declarations: [EditBeneficiaryPage]
})
export class EditBeneficiaryPageModule {}
