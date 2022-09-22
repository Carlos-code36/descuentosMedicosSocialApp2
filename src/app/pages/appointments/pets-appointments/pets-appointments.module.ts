import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';

import { IonicModule } from '@ionic/angular';

import { PetsAppointmentsPageRoutingModule } from './pets-appointments-routing.module';

import { PetsAppointmentsPage } from './pets-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    FontAwesomeModule,
    PetsAppointmentsPageRoutingModule
  ],
  declarations: [PetsAppointmentsPage]
})
export class PetsAppointmentsPageModule {}
