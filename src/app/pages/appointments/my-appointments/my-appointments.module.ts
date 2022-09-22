import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentsPageRoutingModule } from './my-appointments-routing.module';

import { MyAppointmentsPage } from './my-appointments.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    MyAppointmentsPageRoutingModule,
    PipesModule,
  ],
  declarations: [MyAppointmentsPage]
})
export class MyAppointmentsPageModule {}
