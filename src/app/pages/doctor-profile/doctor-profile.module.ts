import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorProfilePageRoutingModule } from './doctor-profile-routing.module';

import { DoctorProfilePage } from './doctor-profile.page';
import { ComponentsModule } from '@app/components/components.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    DoctorProfilePageRoutingModule,
    FontAwesomeModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DoctorProfilePage]
})
export class DoctorProfilePageModule {}
