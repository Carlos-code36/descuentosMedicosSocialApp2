import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorServicesPageRoutingModule } from './doctor-services-routing.module';

import { DoctorServicesPage } from './doctor-services.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    DoctorServicesPageRoutingModule
  ],
  declarations: [DoctorServicesPage]
})
export class DoctorServicesPageModule {}
