import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesAppointmentsPageRoutingModule } from './beneficiaries-appointments-routing.module';

import { BeneficiariesAppointmentsPage } from './beneficiaries-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BeneficiariesAppointmentsPageRoutingModule
  ],
  declarations: [BeneficiariesAppointmentsPage]
})
export class BeneficiariesAppointmentsPageModule {}
