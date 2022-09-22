import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentsDoctorPageRoutingModule } from './appointments-doctor-routing.module';

import { AppointmentsDoctorPage } from './appointments-doctor.page';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AppointmentsDoctorPageRoutingModule
  ],
  declarations: [AppointmentsDoctorPage]
})
export class AppointmentsDoctorPageModule {}
