import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorServicesPage } from './agenda-doctor.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgendaDoctorssModule } from './agenda-doctor-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    AgendaDoctorssModule,  
   ],
  declarations: [DoctorServicesPage]
})
export class AgendaDoctorPageModule {
  
}